using System.ComponentModel.DataAnnotations;

namespace Wosho.Api.Models
{
    public class User
    {
        public Guid userId { get; set; }

        [MaxLength(100)]
        public string firstName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string lastName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string emailAddress { get; set; } = string.Empty;

        [MaxLength(20)]
        public string mobileNumber { get; set; } = string.Empty;
        public string passwordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.Customer;
        public string status { get; set; } = "Active";
        public bool emailVerified { get; set; } = false;
        public bool mobileVerified { get; set; } = false;
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}