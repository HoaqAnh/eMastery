using EngPractice.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EngPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthcheckController : ControllerBase
    {
        [HttpPost("check-api-key")]
        public async Task<IActionResult> CheckApiKey([FromBody] ApiKeyRequest request)
        {
            if (string.IsNullOrEmpty(request.ApiKey))
            {
                return BadRequest(new { message = "API Key không được để trống." });
            }

            var isValidApiKey = await HealthcheckService.Healthcheck(request.ApiKey);
            if (isValidApiKey)
            {
                return Ok(new { message = "API Key hợp lệ." });
            }
            else
            {
                return Unauthorized(new { message = "API Key không hợp lệ." });
            }
        }
    }

    public class ApiKeyRequest
    {
        public string ApiKey { get; set; }
    }
}