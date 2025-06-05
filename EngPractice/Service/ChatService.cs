using EngPractice.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace EngPractice.Service
{
    public class ChatService
    {
        private readonly HttpClient _httpClient;
        private const int MaxRetries = 2;

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
            string apiKey)
        {
            if (!await HealthcheckService.Healthcheck(apiKey))
            {
                throw new Exception("API Key không hợp lệ.");
            }

            if (string.IsNullOrEmpty(apiKey))
            {
                throw new Exception("API Key không được để trống.");
            }

            var systemInstruction = Instructions.GetBasicInstruction(username, gender, age, englishLevel);

            // Kiểm tra chatHistory
            if (conversation.ChatHistory != null && conversation.ChatHistory.Any(h => string.IsNullOrEmpty(h.Message) || h.Message == "string"))
            {
                conversation.ChatHistory = null; // Bỏ chatHistory nếu không hợp lệ
            }

            for (int attempt = 0; attempt < MaxRetries; attempt++)
            {
                try
                {
                    var requestBody = new
                    {
                        contents = BuildContents(conversation),
                        system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                        generationConfig = new
                        {
                            maxOutputTokens = 1000,
                            temperature = attempt == 0 ? 1.0 : 0.5 // Giảm temperature khi retry
                        }
                    };

                    var requestContent = new StringContent(
                        JsonConvert.SerializeObject(requestBody),
                        Encoding.UTF8,
                        "application/json");

                    var response = await _httpClient.PostAsync(
                        $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                        requestContent);

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine($"API error (attempt {attempt + 1}): Status Code: {response.StatusCode}, Body: {errorBody}");
                        continue;
                    }

                    var responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Gemini response (attempt {attempt + 1}): {responseBody}");
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
                            Console.WriteLine($"Failed to extract JSON from Markdown: {message}");
                            continue;
                        }
                    }

                    // Kiểm tra JSON hợp lệ
                    if (IsValidJson(message))
                    {
                        try
                        {
                            var chatResponse = JsonConvert.DeserializeObject<ChatResponse>(message);
                            return chatResponse;
                        }
                        catch (JsonException jsonEx)
                        {
                            Console.WriteLine($"JSON deserialization error: {jsonEx.Message}");
                        }
                    }

                    Console.WriteLine($"Invalid response, retrying (attempt {attempt + 1})...");
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine($"Request error (attempt {attempt + 1}): {ex.Message}");
                    continue;
                }
            }

            // Fallback nếu tất cả retries thất bại
            return new ChatResponse
            {
                MessageInMarkdown = "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến học tiếng Anh. Bạn muốn học gì về tiếng Anh hôm nay?",
                Suggestions = GenerateContextualSuggestions(conversation.Question)
            };
        }

        private object[] BuildContents(Conversation conversation)
        {
            var contents = new List<object>();

            // Thêm lịch sử trò chuyện nếu có
            if (conversation.ChatHistory != null && conversation.ChatHistory.Any())
            {
                foreach (var history in conversation.ChatHistory)
                {
                    contents.Add(new
                    {
                        role = history.FromUser ? "user" : "model",
                        parts = new[] { new { text = history.Message } }
                    });
                }
            }

            // Thêm câu hỏi hiện tại
            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = conversation.Question } }
            });

            return contents.ToArray();
        }

        private bool IsValidJson(string str)
        {
            try
            {
                JToken.Parse(str);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private List<string> GenerateContextualSuggestions(string question)
        {
            if (string.IsNullOrEmpty(question) || question.ToLower().Contains("xin chào") || question.ToLower() == "hi")
            {
                return new List<string>
                {
                    "Bạn muốn học cách giới thiệu bản thân bằng tiếng Anh không?",
                    "Chúng ta có thể luyện từ vựng cơ bản không?"
                };
            }

            if (question.ToLower().Contains("từ vựng"))
            {
                return new List<string>
                {
                    "Bạn muốn học từ vựng về chủ đề nào tiếp theo?",
                    "Chúng ta có thể luyện cách sử dụng từ vựng trong câu không?"
                };
            }

            if (question.ToLower().Contains("ngữ pháp"))
            {
                return new List<string>
                {
                    "Bạn muốn học cấu trúc ngữ pháp nào tiếp theo?",
                    "Chúng ta có thể luyện tập viết câu với ngữ pháp vừa học không?"
                };
            }

            return new List<string>
            {
                "Bạn muốn học từ vựng về chủ đề nào?",
                "Chúng ta có thể luyện ngữ pháp cơ bản không?"
            };
        }
    }
}