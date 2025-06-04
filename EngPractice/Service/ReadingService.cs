using EngPractice.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace EngPractice.Service
{
    public class ReadingService
    {
        private readonly HttpClient _httpClient;
        private const int MaxRetries = 2;

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

            for (int attempt = 0; attempt < MaxRetries; attempt++)
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
                                parts = new[] { new { text = "Generate a reading passage for the specified English level." } }
                            }
                        },
                        system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                        generationConfig = new
                        {
                            maxOutputTokens = 500,
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

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine($"API error (attempt {attempt + 1}): Status Code: {response.StatusCode}, Body: {errorBody}");
                        continue;
                    }

                    var responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Generate passage response: {responseBody}");

                    var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    string message = geminiResponse.candidates[0].content.parts[0].text;

                    Console.WriteLine($"Message before processing: {message}");

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

                    if (IsValidJson(message))
                    {
                        try
                        {
                            var passageResponse = JsonConvert.DeserializeObject<ReadingPassageResponse>(message);
                            return passageResponse;
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

            throw new Exception("Không thể tạo đoạn văn sau nhiều lần thử.");
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

            for (int attempt = 0; attempt < MaxRetries; attempt++)
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
                                parts = new[] { new { text = JsonConvert.SerializeObject(new { UserGuess = userGuess, CorrectPhrase = correctPhrase }) } }
                            }
                        },
                        system_instruction = new { parts = new[] { new { text = systemInstruction } } },
                        generationConfig = new
                        {
                            maxOutputTokens = 500,
                            temperature = attempt == 0 ? 0.5 : 0.3
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
                    Console.WriteLine($"Evaluate guess response: {responseBody}");

                    var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    string message = geminiResponse.candidates[0].content.parts[0].text;

                    Console.WriteLine($"Message before processing: {message}");

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

                    if (IsValidJson(message))
                    {
                        try
                        {
                            var evaluationResponse = JsonConvert.DeserializeObject<EvaluationResponse>(message);
                            return evaluationResponse;
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

            throw new Exception("Không thể đánh giá câu trả lời sau nhiều lần thử.");
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
    }

    public class ReadingPassageResponse
    {
        public string Description { get; set; }
        public string Translation { get; set; }
        public string Phrase { get; set; }
        public string PhraseTranslation { get; set; }
    }

    public class EvaluationResponse
    {
        public int Accuracy { get; set; }
        public string Explanation { get; set; }
    }
}