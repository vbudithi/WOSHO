
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wosho.Api.Data;
using Wosho.Api.DTO;
using Wosho.Api.Models;
using Wosho.Api.Services;


namespace Wosho.Api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController : ControllerBase
    {

        private readonly WoshoDbContext _db;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtService _jwtService;


        public AuthController(WoshoDbContext db, IPasswordHasher<User> passwordHasher, IJwtService jwtService)
        {
            _db = db;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
        }

        //Register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var Email = dto.EmailAddress.ToLower().Trim();

            //Check if email already exists
            var existingEail = await _db.Users
                .AnyAsync(u => u.EmailAddress == dto.EmailAddress);
            if (existingEail)
            {
                return Conflict(new
                {
                    message = "Email already registered",
                    field = "email"
                });
            }

            //Check if mobile number already exists
            var existingMobile = await _db.Users
                .AnyAsync(u => u.MobileNumber == dto.MobileNumber);

            if (existingMobile)
            {
                return Conflict(new
                {
                    message = "Mobile number is already registered."
                });
            }

            //Create user
            var user = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                EmailAddress = dto.EmailAddress,
                MobileNumber = dto.MobileNumber,
                Role = UserRole.Customer,
                Status = "Active",
                EmailVerified = false,
                MobileVerified = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            //Hash Password
            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                dto.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Created("", new
            {
                message = "Registered Successfully",
                user = user.UserId,
                email = user.EmailAddress
            });
        }

        //Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var email = dto.EmailAddress.ToLower().Trim();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.EmailAddress.ToLower() == email);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }

            if (user.Status != "Active")
            {
                return Unauthorized(new
                {
                    message = "Your account is not active."
                });
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                dto.Password
                );

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var jwt = _jwtService.GenerateToken(user);

            var response = new LoginResponseDto
            {
                Token = jwt.Token,
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailAddress = user.EmailAddress,
                Role = user.Role.ToString(),
                ExpiresAt = jwt.ExpiresAt
            };
            return Ok(response);
        }
    }
}