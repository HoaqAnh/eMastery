using Microsoft.AspNetCore.Mvc;
using EngPractice.Domain;
using EngPractice.Service;

namespace EngPractice.Controllers
{
    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;
        public EmailController(EmailService emailService) 
        {
            _emailService = emailService;
        }
        [HttpPost]
        public async Task<IActionResult> Send([FromBody] ContactRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Vui lòng nhập nội dung góp ý.");

            try
            {
                await _emailService.SendFeedbackAsync(request.Name,request.Message);
                return Ok("Gửi góp ý thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi gửi email: {ex.Message}");
            }
        }
    }
}
