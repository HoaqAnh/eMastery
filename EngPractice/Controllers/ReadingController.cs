using EngPractice.Domain;
using EngPractice.Service;
using Microsoft.AspNetCore.Mvc;

namespace EngPractice.Controllers
{
    [ApiController]
    [Route("api/reading")]
    public class ReadingController : ControllerBase
    {
        private readonly ReadingService _readingService;

        public ReadingController(ReadingService readingService)
        {
            _readingService = readingService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GeneratePassage([FromBody] ReadingRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _readingService.GenerateReadingWord(request.EnglishLevel, request.GeminiApiKey);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }

        [HttpPost("evaluate")]
        public async Task<IActionResult> EvaluateGuess([FromBody] EvaluationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _readingService.EvaluateGuess(request.UserGuess, request.CorrectPhrase, request.GeminiApiKey);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }
    }

    public class ReadingRequest
    {
        public EnglishLevel EnglishLevel { get; set; }
        public string GeminiApiKey { get; set; }
    }

    public class EvaluationRequest
    {
        public string UserGuess { get; set; }
        public string CorrectPhrase { get; set; }
        public string GeminiApiKey { get; set; }
    }
}