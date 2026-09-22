using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace Wosho.Api.DTO
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public required string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public required string LastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public required string MobileNumber { get; set; }

        [Required]
        [MinLength(8)]
        public required string Password { get; set; }

        [Required]
        [Compare("Password")]
        public required string ConfirmPassword { get; set; }
    }
}
