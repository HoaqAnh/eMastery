using EngPractice.Domain;
using EngPractice.Service;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.RegularExpressions;
using static EngPractice.Service.DictionaryService;

namespace EngPractice.Controllers
{
    [ApiController]
    [Route("api/translate")]
    public class DictionaryController : Controller
    {
        private readonly DictionaryService _dictionaryService;
        public DictionaryController(DictionaryService dictionaryService)
        {
            _dictionaryService = dictionaryService;
        }
        public class TranslateRequest
        {
            public string Word { get; set; }
            public string ApiKey { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> Translate([FromBody] TranslateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Word) || string.IsNullOrWhiteSpace(request.ApiKey))
                return BadRequest(new { error = "Thiếu từ hoặc API key." });

            // Kiểm tra từ đơn (ngăn đoạn văn, ký tự đặc biệt, số)
            if (!Regex.IsMatch(request.Word.Trim(), @"^[a-zA-Z\-]+$"))
            {
                return BadRequest(new { error = "Vui lòng chỉ nhập một từ đơn hợp lệ (không chứa khoảng trắng, số hoặc ký tự đặc biệt)." });
            }

            try
            {
                TranslateWordResponse rawResponse = await _dictionaryService.TranslateWord(request.Word, request.ApiKey);
                WordExplanationDto explanationDto = _dictionaryService.ParseToDto(rawResponse.Explanation);
                return Ok(new
                {
                    Word = request.Word,
                    Explanation = explanationDto
                });
            }
            catch (HttpRequestException e)
            {
                return StatusCode(502, new { error = $"Lỗi khi gọi Gemini API: {e.Message}" });
            }
            catch (JsonException e)
            {
                return StatusCode(500, new { error = "Lỗi khi phân tích kết quả trả về từ Gemini.", detail = e.Message });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "Lỗi không xác định.", detail = e.Message });
            }
        }

    }
}
