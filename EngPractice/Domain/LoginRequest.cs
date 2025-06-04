namespace EngPractice.Domain
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public EnglishLevel englishLevel { get; set; }
        public string GeminiApiKey { get; set; }
    }
}
