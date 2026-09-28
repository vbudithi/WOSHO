using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Wosho.Api.Models;

namespace Wosho.Api.Services
{
	public class JwtService : IJwtService
	{
		private readonly IConfiguration _configuration;

		public JwtService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public (string Token, DateTime ExpiresAt) GenerateToken(User user)
		{
			var jwtSettings = _configuration.GetSection("Jwt");

			var key = jwtSettings["Key"]
				?? throw new InvalidOperationException("JWT Key is not configured.");

			var issuer = jwtSettings["Issuer"]
				?? throw new InvalidOperationException("JWT Issuer is not configured.");

			var audience = jwtSettings["Audience"]
				?? throw new InvalidOperationException("JWT Audience is not configured.");

			var expiresInMinutes = int.Parse(
				jwtSettings["ExpiresInMinutes"] ?? "60"
			);

			var expiresAt = DateTime.UtcNow.AddMinutes(expiresInMinutes);

			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
				new Claim(JwtRegisteredClaimNames.Email, user.EmailAddress),
				new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
				new Claim(ClaimTypes.Email, user.EmailAddress),
				new Claim(ClaimTypes.Role, user.Role.ToString()),
				new Claim(
					ClaimTypes.Name,
					$"{user.FirstName} {user.LastName}"
				)
			};

			var securityKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(key)
			);

			var credentials = new SigningCredentials(
				securityKey,
				SecurityAlgorithms.HmacSha256
			);

			var token = new JwtSecurityToken(
				issuer: issuer,
				audience: audience,
				claims: claims,
				expires: expiresAt,
				signingCredentials: credentials
			);

			return (
				new JwtSecurityTokenHandler().WriteToken(token),
				expiresAt
			);
		}
	}
}