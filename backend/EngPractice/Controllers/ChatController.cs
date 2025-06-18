using EngPractice.Domain;
using EngPractice.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EngPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            try
            {
                // Kiểm tra thông tin đầu vào
                if (string.IsNullOrEmpty(request.Username) ||
                    string.IsNullOrEmpty(request.Gender) ||
                    request.Age <= 0 ||
                    string.IsNullOrEmpty(request.GeminiApiKey) ||
                    request.Conversation == null ||
                    string.IsNullOrEmpty(request.Conversation.Question))
                {
                    return BadRequest(new { message = "Vui lòng cung cấp đầy đủ thông tin." });
                }

                // Gọi ChatService để xử lý yêu cầu
                var response = await _chatService.GenerateAnswer(
                    request.Conversation,
                    request.Username,
                    request.Gender,
                    request.Age,
                    request.EnglishLevel,
                    request.GeminiApiKey);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }
    }

    public class ChatRequest
    {
        public Conversation Conversation { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public EnglishLevel EnglishLevel { get; set; }
        public string GeminiApiKey { get; set; } 

    }
}