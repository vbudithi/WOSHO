using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Wosho.Api.DTO;
using Wosho.Api.Services;

namespace Wosho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;
        public PasswordController(
            IPasswordResetService passwordResetService)
        {
            _passwordResetService = passwordResetService;
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
            ForgotPasswordDto dto)
        {
            try
            {
                var result = await _passwordResetService.GenerateResetTokenAsync(dto.EmailAddress);
                if (!result)
                {
                    return BadRequest(new
                    {
                        message = "Unable to generate password reset token."

                    });
                }

                return Ok(new
                {
                    message = "Password reset token generated successfully."
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            var result = await _passwordResetService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!result)
            {
                return BadRequest(new
                {
                    message = "Invalid or expired reset token"
                });
            }

            return Ok(new
            {
                message = "Password Reset successfully"
            });
        }
    }

};

