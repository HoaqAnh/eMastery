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
                            maxOutputTokens = 1500,
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

                    if (message.StartsWith("```json") || message.StartsWith("```"))
                    {
                        var match = Regex.Match(message, @"```(?:json)?\n([\s\S]*?)\n```");
                        if (match.Success)
                        {
                            message = match.Groups[1].Value;
                        }
                    }

                    

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

            if (string.IsNullOrWhiteSpace(rawText))
                return dto;

            // Tách thành từng phần dựa vào số thứ tự (ví dụ: "1. PHÁT ÂM...")
            var parts = Regex.Split(rawText, @"(?=\b\d+\.\s+)") // giữ số thứ tự
                             .Where(p => !string.IsNullOrWhiteSpace(p))
                             .ToList();

            foreach (var part in parts)
            {
                string lowerPart = part.ToLowerInvariant();

                if (lowerPart.StartsWith("1."))
                    dto.Pronunciation = RemovePrefixOnly(part, "1.");
                else if (lowerPart.StartsWith("2."))
                    dto.Meaning = RemovePrefixOnly(part, "2.");
                else if (lowerPart.StartsWith("3."))
                    dto.GrammarUsage = RemovePrefixOnly(part, "3.");
                else if (lowerPart.StartsWith("4."))
                    dto.PhrasesAndIdioms = RemovePrefixOnly(part, "4.");
                else if (lowerPart.StartsWith("5."))
                    dto.SynonymsAndAntonyms = RemovePrefixOnly(part, "5.");
                else if (lowerPart.StartsWith("6."))
                    dto.FunFactsAndTips = RemovePrefixOnly(part, "6.");
                else if (lowerPart.StartsWith("7."))
                    dto.Summary = RemovePrefixOnly(part, "7.");
            }

            return dto;
        }

        private string RemovePrefixOnly(string section, string prefix)
        {
            // Bỏ tiền tố số thứ tự (ví dụ "1. ") nhưng giữ nguyên tiêu đề như "PHÁT ÂM"
            return section.Substring(prefix.Length).Trim();
        }

    }
}
