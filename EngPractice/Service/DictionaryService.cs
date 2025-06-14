using Newtonsoft.Json;
using System.Text;
using EngPractice.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

using System.Text.Json;
using JsonException = Newtonsoft.Json.JsonException;

namespace EngPractice.Service
{
    public class DictionaryService 
    {
        private readonly HttpClient _httpClient;
        public DictionaryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<TranslateWordResponse> TranslateWord(string word, string apiKey)
        {
            const int MaxRetries = 2;

            if (string.IsNullOrWhiteSpace(apiKey))
                throw new Exception("API Key không được để trống.");

            if (!await HealthcheckService.Healthcheck(apiKey))
                throw new Exception("API Key không hợp lệ.");

            var systemInstruction = Instructions.Translate(word);

            for (int attempt = 0; attempt <= MaxRetries; attempt++)
            {
                try
                {
                    var requestBody = new
                    {
                        contents = new[]
                        {
                    new
                    {
                        role = "user",
                        parts = new[] { new { text = $"Giải nghĩa từ \"{word}\" bằng tiếng Việt." } }
                    }
                },
                        system_instruction = new
                        {
                            parts = new[] { new { text = systemInstruction } }
                        },
                        generationConfig = new
                        {
                            maxOutputTokens = 1000,
                            temperature = attempt == 0 ? 0.7 : 0.5
                        }
                    };

                    var requestContent = new StringContent(
                        JsonConvert.SerializeObject(requestBody),
                        Encoding.UTF8,
                        "application/json");

                    var response = await _httpClient.PostAsync(
                        $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                        requestContent);

                    var responseBody = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"[Gemini API attempt {attempt + 1}] Status: {response.StatusCode}");
                        Console.WriteLine($"Response body: {responseBody}");
                        continue;
                    }

                    Console.WriteLine($"[Gemini API Success] Response: {responseBody}");

                    var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    string message = geminiResponse?.candidates?[0]?.content?.parts?[0]?.text;

                    if (string.IsNullOrWhiteSpace(message))
                    {
                        Console.WriteLine("Empty or invalid response from Gemini.");
                        continue;
                    }

                    // Optional: Remove markdown block markers if present
                    if (message.StartsWith("```json") || message.StartsWith("```"))
                    {
                        var match = Regex.Match(message, @"```(?:json)?\n([\s\S]*?)\n```");
                        if (match.Success)
                        {
                            message = match.Groups[1].Value;
                        }
                    }

                    // Return the plain explanation
                    return new TranslateWordResponse
                    {
                        Word = word,
                        Explanation = message.Trim()
                    };
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine($"[HTTP Error - attempt {attempt + 1}]: {ex.Message}");
                    continue;
                }
                catch (JsonException ex)
                {
                    Console.WriteLine($"[JSON Parsing Error - attempt {attempt + 1}]: {ex.Message}");
                    continue;
                }
            }

            throw new Exception("Không thể tạo giải nghĩa sau nhiều lần thử.");
        }

        public class TranslateWordResponse
        {
            public string Word { get; set; }
            public string Explanation { get; set; }
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
        public WordExplanationDto ParseToDto(string rawText)
        {
            var dto = new WordExplanationDto();

            // Bổ sung chuẩn hóa
            rawText = rawText.Replace("\r", "").Trim();

            // Sử dụng regex để bắt từng mục
            var sections = Regex.Split(rawText, @"\*\*\s*\d+\.\s*([^\*]+)\s*\*\*")
                                .Select(s => s.Trim())
                                .ToList();

            // Regex.Split ở trên tách chuỗi thành: [Intro, Title1, Content1, Title2, Content2, ...]
            for (int i = 1; i < sections.Count - 1; i += 2)
            {
                string title = sections[i].ToLowerInvariant();
                string content = sections[i + 1];

                if (title.Contains("phát âm"))
                    dto.Pronunciation = content;
                else if (title.Contains("giải nghĩa"))
                    dto.Meaning = content;
                else if (title.Contains("ngữ pháp") || title.Contains("ứng dụng"))
                    dto.GrammarUsage = content;
                else if (title.Contains("cụm từ") || title.Contains("thành ngữ"))
                    dto.PhrasesAndIdioms = content;
                else if (title.Contains("đồng nghĩa") || title.Contains("trái nghĩa"))
                    dto.SynonymsAndAntonyms = content;
                else if (title.Contains("thú vị") || title.Contains("mẹo"))
                    dto.FunFactsAndTips = content;
                else if (title.Contains("tổng kết"))
                    dto.Summary = content;
            }

            return dto;
        }
    }
}
