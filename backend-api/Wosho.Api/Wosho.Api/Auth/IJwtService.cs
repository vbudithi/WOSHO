using Wosho.Api.Models;

namespace Wosho.Api.Services
{
    public interface IJwtService
    {
        (string Token, DateTime ExpiresAt) GenerateToken(User user);
    }
}