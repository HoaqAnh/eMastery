using EngPractice.Domain;
using Google.Apis.Auth;

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
        public async Task<GoogleLoginResponse> LoginWithGoogleAsync(string idToken)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            if (payload == null)
            {
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "Đăng nhập bằng Google không thành công."
                };
            }
            return new GoogleLoginResponse
            {
                Success = true,
                Message = $"Chào mừng {payload.Name}! Đăng nhập thành công.",
                IdToken = idToken,
                UserInfoGoogle = new UserInfoGoogle
                {
                    Email = payload.Email,
                    FullName = payload.Name,
                    Gender = null,
                    Age = 0
                }
            };
        }
        public async Task<GoogleLoginResponse> SaveAdditionalInfoAsync(UserInfoGoogle request)
        {
            // Validate đơn giản
            if (string.IsNullOrEmpty(request.Email) ||
                string.IsNullOrEmpty(request.FullName) ||
                string.IsNullOrEmpty(request.Gender) ||
                request.Age <= 0)
            {
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "Thông tin bổ sung không hợp lệ.",
                    UserInfoGoogle = null
                };
            }

            // Trả về thông tin người dùng Google đã hoàn chỉnh
            return new GoogleLoginResponse
            {
                Success = true,
                Message = $"Chào mừng {request.FullName}! Hoàn tất thông tin thành công.",
                UserInfoGoogle = new UserInfoGoogle
                {
                    Email = request.Email,
                    FullName = request.FullName,
                    Gender = request.Gender,
                    Age = request.Age,
                    Level = request.Level ?? "A1"
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
    public class GoogleLoginResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string IdToken { get; set; }

        public UserInfoGoogle UserInfoGoogle { get; set; }
    }
    public class UserInfoGoogle
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Level { get; set; } = "A1";
    }
}
