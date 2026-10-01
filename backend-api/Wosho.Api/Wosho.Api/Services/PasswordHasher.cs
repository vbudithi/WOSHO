using Microsoft.AspNetCore.Identity;
using Wosho.Api.Models;


namespace Wosho.Api.Services
{
    public class PasswordHasher: IPasswordHasher
    {
        private readonly PasswordHasher<User> _hasher;

        public PasswordHasher()
        {
            _hasher = new PasswordHasher<User>();
        }

        public string HashPassword(string password)
        {
            var user = new User();

            return _hasher.HashPassword(user, password);
        }

        public bool VerifyPassword(string password, string hash)
        {
            var user = new User();
            var result = _hasher.VerifyHashedPassword(user, password, hash);

            return result ==PasswordVerificationResult.Success||  
                   result == PasswordVerificationResult.SuccessRehashNeeded;
        }
    }
}
