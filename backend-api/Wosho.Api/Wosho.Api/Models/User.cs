 using System.ComponentModel.DataAnnotations;

namespace Wosho.Api.Models
{
    public class User
    {
        public Guid UserId { get; set; }

        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string EmailAddress { get; set; } = string.Empty;

        [MaxLength(20)]
        public string MobileNumber { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.Customer;
        public string Status { get; set; } = "Active";
        public bool EmailVerified { get; set; } = false;
        public bool MobileVerified { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}