using Newtonsoft.Json;
using System.Text;

namespace EngPractice.Service
{
    public static class HealthcheckService
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task<bool> Healthcheck(string apiKey)
        {
            // Tạo yêu cầu thử nghiệm với một prompt nhỏ
            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[] { new { text = "Hello, this is a test." } }
                    }
                },
                generationConfig = new
                {
                    maxOutputTokens = 10
                }
            };

            var requestContent = new StringContent(
                JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json");

            try
            {
                // Gửi yêu cầu đến Gemini API
                var response = await _httpClient.PostAsync(
                    $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                    requestContent);

                // Chỉ coi API key hợp lệ nếu yêu cầu thành công (status code 200)
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }

                // Nếu có bất kỳ lỗi nào (401, 403, 400, 429, v.v.), coi API key không hợp lệ
                return false;
            }
            catch (Exception ex)
            {
                // Nếu có ngoại lệ (mạng lỗi, API không phản hồi), coi API key không hợp lệ
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
    }
}