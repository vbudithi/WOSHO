using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Wosho.Api.Data;
using Wosho.Api.DTO;

namespace Wosho.Api.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly WoshoDbContext _db;
        private readonly IPasswordHasher _hasher;

        public PasswordResetService(WoshoDbContext db, IPasswordHasher hasher)
        {
            _db = db;
            _hasher = hasher;
        }

        public async Task<bool> GenerateResetTokenAsync(string email)
        {
            email = email.ToLower().Trim();

            //Find user 
            var user = await _db.Users.FirstOrDefaultAsync(x => x.EmailAddress.ToLower() == email);

            if (user == null)
            {
                throw new InvalidOperationException("No Email Entered");

            }

            //Remove previous unused tokens 
            var previousTokens = await _db.PasswordResetTokens
                .Where(x => x.UserId == user.UserId && x.UsedAt == null).ToListAsync();

            _db.PasswordResetTokens.RemoveRange(previousTokens);

            //Generate secure random token
            var tokenBytes = RandomNumberGenerator.GetBytes(32);
            var token = Convert.ToBase64String(tokenBytes);


            //Hash token before storing it
            var tokenHashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
            var tokenHash = Convert.ToBase64String(tokenHashBytes);


            //create new reset token
            var resetToken = new PasswordResetToken
            {
                Id = Guid.NewGuid(),
                UserId = user.UserId,
                TokenHash = tokenHash,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddMinutes(30),
                UsedAt = null
            };

            await _db.PasswordResetTokens.AddAsync(resetToken);
            await _db.SaveChangesAsync();

            // Development only. 
            // Later replace this with email service.

            Console.WriteLine($"Reset Token: {token}"); 
            return true;

        }

        public async Task<bool> ResetPasswordAsync(
            string token, 
            string newPassword)
        {

            //Hash the token received from the user
            var tokenHashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
            var tokenHash = Convert.ToBase64String(tokenHashBytes);

            //Find valid unused token
            var tokenEntry = await _db.PasswordResetTokens
                .FirstOrDefaultAsync(x=>
                x.TokenHash ==tokenHash &&
                x.UsedAt==null);

            //Token doesnt exist 
            if(tokenEntry == null)
            {
                return false;
            }

            //Token has epired
            if(tokenEntry.ExpiresAt<DateTime.UtcNow)
            {
                return false;
            }


            //Find user
            var user = await _db.Users
                .FirstOrDefaultAsync(x =>
                x.UserId == tokenEntry.UserId);

            if (user == null)
            {
                return false;
            }

            //Hash the new password using secure PasswordHasher
            user.PasswordHash=_hasher.HashPassword(newPassword);
            user.UpdatedAt=DateTime.UtcNow;

            //Mark reset token as used
            tokenEntry.UsedAt=DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
