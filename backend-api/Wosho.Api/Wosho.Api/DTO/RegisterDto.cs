using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace Wosho.Api.DTO
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public required string firstName { get; set; }

        [Required]
        [MaxLength(100)]
        public required string lastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string emailAddress { get; set; }

        [Required]
        [MaxLength(100)]
        public required string mobileNumber { get; set; }

        [Required]
        [MinLength(8)]
        public required string password { get; set; }

    }
}
