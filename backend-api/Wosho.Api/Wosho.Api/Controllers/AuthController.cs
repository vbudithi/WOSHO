
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
            var Email = dto.emailAddress.ToLower().Trim();

            //Check if email already exists
            var existingEail = await _db.Users
                .AnyAsync(u => u.emailAddress == dto.emailAddress);
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
                .AnyAsync(u=>u.mobileNumber == dto.mobileNumber);

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
                userId = Guid.NewGuid(),
                firstName = dto.firstName,
                lastName = dto.lastName,
                emailAddress = dto.emailAddress,
                mobileNumber = dto.mobileNumber,
                Role = UserRole.Customer,
                status = "Active",
                emailVerified = false,
                mobileVerified = false,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
            };

            //Hash Password
            user.passwordHash = _passwordHasher.HashPassword(
                user,
                dto.password);

            //Save user
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Created("", new
            {
                message = "Registered Successfully",
                user = user.userId,
                email = user.emailAddress

            });
        }
    }
}
