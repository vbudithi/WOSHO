
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wosho.Api.Data;
using Wosho.Api.DTO;
using Wosho.Api.Models;


namespace Wosho.Api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController:ControllerBase
    {

        private readonly WoshoDbContext _db;
        private readonly IPasswordHasher<User> _passwordHasher;


        public AuthController(WoshoDbContext db, IPasswordHasher<User> passwordHasher)
        {
            _db = db;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var Email = dto.Email.ToLower().Trim();

            //Check if email already exists
            var existingEail = await _db.Users
                .AnyAsync(u => u.Email == dto.Email);
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
                .AnyAsync(u=>u.MobileNumber == dto.MobileNumber);

            if (existingMobile)
            {
                return Conflict(new
                {
                    message="Mobile number is already registered."
                });
            }

            //Create user
            var user = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
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

            //Save user
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Created("", new
            {
                message = "Registered Successfully",
                user = user.UserId,
                email = user.Email

            });
        }
    }
}
