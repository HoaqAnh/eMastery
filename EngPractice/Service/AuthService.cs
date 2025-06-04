using EngPractice.Domain;

namespace EngPractice.Service
{
    public class AuthService
    {
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Username) ||
                string.IsNullOrEmpty(request.Gender) ||
                request.Age <= 0 ||
                string.IsNullOrEmpty(request.GeminiApiKey))
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Vui lòng điền đầy đủ thông tin."
                };
            }

            var isValidApiKey = await HealthcheckService.Healthcheck(request.GeminiApiKey);
            if (!isValidApiKey)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Gemini API Key không hợp lệ."
                };
            }

            return new LoginResponse
            {
                Success = true,
                Message = $"Chào mừng {request.Username}! Đăng nhập thành công.",
                UserInfo = new UserInfo
                {
                    FullName = request.Username,
                    Gender = request.Gender,
                    Age = request.Age,
                    englishLevel=request.englishLevel,
                    GeminiApiKey = request.GeminiApiKey
                }
            };
        }
    }

    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public UserInfo UserInfo { get; set; }
    }

    public class UserInfo
    {
        public string FullName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public EnglishLevel englishLevel { get; set; }
        public string GeminiApiKey { get; set; }
    }
}