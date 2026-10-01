using System.ComponentModel.DataAnnotations;

namespace Wosho.Api.DTO
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
    }
}
