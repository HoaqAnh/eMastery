using EngPractice.Domain;
using Newtonsoft.Json;
using System.Text;

namespace EngPractice.Service
{
    public class ChatService
    {
        private readonly HttpClient _httpClient;

        public ChatService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ChatResponse> GenerateAnswer(
            Conversation conversation,
            string username,
            string gender,
            int age,
            EnglishLevel englishLevel,
            string apiKey,
            bool enableReasoning,
            bool enableSearching)
        {
            // Kiểm tra API key
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new Exception("API Key không được để trống.");
            }

            var systemInstruction = enableReasoning
                ? Instructions.GetReasoningInstruction(username, gender, age, englishLevel)
                : enableSearching
                    ? Instructions.GetSearchingInstruction(username, gender, age, englishLevel)
                    : Instructions.GetBasicInstruction(username, gender, age, englishLevel);

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[] { new { text = conversation.Question } }
                    }
                },
                system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                generationConfig = new
                {
                    maxOutputTokens = 1000,
                    temperature = enableSearching ? 0.3 : 1.0
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
            var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);

            string message = geminiResponse.candidates[0].content.parts[0].text;

            // Nếu Gemini trả về Markdown có chứa JSON như ```json\n{...}\n```
            if (message.StartsWith("```json"))
            {
                // Loại bỏ ```json và ```
                int startIndex = message.IndexOf('{');
                int endIndex = message.LastIndexOf('}');
                if (startIndex >= 0 && endIndex > startIndex)
                {
                    string extractedJson = message.Substring(startIndex, endIndex - startIndex + 1);
                    message = extractedJson;
                }
            }

            ChatResponse chatResponse = JsonConvert.DeserializeObject<ChatResponse>(message);



            if (enableSearching)
            {
                // Xử lý nguồn và gợi ý tìm kiếm nếu cần (theo mã gốc)
            }

            return chatResponse;
        }
    }
}