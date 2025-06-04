using EngPractice.Domain;
using Newtonsoft.Json;
using System.Text;
using System.Text.RegularExpressions;

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
            if (!await HealthcheckService.Healthcheck(apiKey))
            {
                throw new Exception("API Key không hợp lệ.");
            }

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
            Console.WriteLine($"Gemini response: {responseBody}");
            Console.WriteLine($"User question: {conversation.Question}");

            var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);
            string message = geminiResponse.candidates[0].content.parts[0].text;

            Console.WriteLine($"Message before processing: {message}");

            // Xử lý Markdown nếu có
            if (message.StartsWith("```json"))
            {
                var jsonMatch = Regex.Match(message, @"```json\n([\s\S]*?)\n```");
                if (jsonMatch.Success)
                {
                    message = jsonMatch.Groups[1].Value;
                    Console.WriteLine($"Extracted JSON: {message}");
                }
                else
                {
                    throw new Exception($"Không thể trích xuất JSON từ Markdown: {message}");
                }
            }

            // Thử deserialize JSON
            ChatResponse chatResponse;
            try
            {
                chatResponse = JsonConvert.DeserializeObject<ChatResponse>(message);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON deserialization error: {jsonEx.Message}");
                // Xử lý như văn bản thuần túy nếu không phải JSON
                chatResponse = new ChatResponse
                {
                    MessageInMarkdown = message,
                    Suggestions = new List<string>
                    {
                        "Bạn muốn học từ vựng về chủ đề nào?",
                        "Chúng ta có thể luyện ngữ pháp cơ bản không?"
                    }
                };
            }

            if (enableSearching)
            {
                // Xử lý nguồn và gợi ý tìm kiếm nếu cần
            }

            return chatResponse;
        }
    }
}