using EngPractice.Domain;
using Newtonsoft.Json;
using System.Text;

namespace EngPractice.Service
{
    public class ReadingService
    {
        private readonly HttpClient _httpClient;

        public ReadingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ReadingPassageResponse> GenerateReadingPassage(EnglishLevel englishLevel, string apiKey)
        {
            if (!await HealthcheckService.Healthcheck(apiKey))
            {
                throw new Exception("API Key không hợp lệ.");
            }

            if (string.IsNullOrEmpty(apiKey))
            {
                throw new Exception("API Key không được để trống.");
            }

            var systemInstruction = Instructions.GetReadingPassageInstruction(englishLevel);

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[] { new { text = "Generate a reading passage for the specified English level." } }
                    }
                },
                system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                generationConfig = new
                {
                    maxOutputTokens = 500,
                    temperature = 0.7
                }
            };

            var requestContent = new StringContent(
                JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                requestContent);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Generate passage response: {responseBody}");

            var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);
            string message = geminiResponse.candidates[0].content.parts[0].text;

            Console.WriteLine($"Message before processing: {message}");

            ReadingPassageResponse passageResponse;
            try
            {
                passageResponse = JsonConvert.DeserializeObject<ReadingPassageResponse>(message);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON deserialization error: {jsonEx.Message}");
                throw new Exception($"Lỗi khi xử lý phản hồi từ Gemini: {message}");
            }

            return passageResponse;
        }

        public async Task<EvaluationResponse> EvaluateGuess(string userGuess, string correctPhrase, string apiKey)
        {
            if (!await HealthcheckService.Healthcheck(apiKey))
            {
                throw new Exception("API Key không hợp lệ.");
            }

            if (string.IsNullOrEmpty(apiKey))
            {
                throw new Exception("API Key không được để trống.");
            }

            var systemInstruction = Instructions.GetEvaluationInstruction();

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[] { new { text = JsonConvert.SerializeObject(new { UserGuess = userGuess, CorrectPhrase = correctPhrase }) } }
                    }
                },
                system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                generationConfig = new
                {
                    maxOutputTokens = 500,
                    temperature = 0.5
                }
            };

            var requestContent = new StringContent(
                JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                requestContent);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Evaluate guess response: {responseBody}");

            var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);
            string message = geminiResponse.candidates[0].content.parts[0].text;

            Console.WriteLine($"Message before processing: {message}");

            EvaluationResponse evaluationResponse;
            try
            {
                evaluationResponse = JsonConvert.DeserializeObject<EvaluationResponse>(message);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON deserialization error: {jsonEx.Message}");
                throw new Exception($"Lỗi khi xử lý phản hồi từ Gemini: {message}");
            }

            return evaluationResponse;
        }
    }

    public class ReadingPassageResponse
    {
        public string Description { get; set; }
        public string Phrase { get; set; }
    }

    public class EvaluationResponse
    {
        public int Accuracy { get; set; }
        public string Explanation { get; set; }
    }
}