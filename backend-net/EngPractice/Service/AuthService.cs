using EngPractice.Domain;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EngPractice.Service
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
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
                    englishLevel = request.englishLevel,
                    GeminiApiKey = request.GeminiApiKey
                }
            };
        }

        public async Task<GoogleLoginResponse> LoginWithGoogleAsync(string authorizationCode)
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            var clientSecret = _configuration["Authentication:Google:ClientSecret"];
            var redirectUri = _configuration["Authentication:Google:RedirectUri"];

            var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = clientId,
                    ClientSecret = clientSecret
                },
                Scopes = new[] { "email", "profile" } 
            });
         
            TokenResponse tokenResponse;
            try
            {
                tokenResponse = await flow.ExchangeCodeForTokenAsync("user", authorizationCode, redirectUri, CancellationToken.None);
            }
            catch (Exception ex)
            {               
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "Lỗi khi trao đổi mã AuthorizationCode. " + ex.Message
                };
            }

            if (tokenResponse == null || string.IsNullOrEmpty(tokenResponse.IdToken))
            {
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "Không thể lấy được IdToken từ Google."
                };
            }          
            var idToken = tokenResponse.IdToken;
            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            }
            catch (Exception ex)
            {             
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "IdToken không hợp lệ. " + ex.Message
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
            if (string.IsNullOrEmpty(request.Gender) || string.IsNullOrEmpty(request.Level) || request.Age <= 0)
            {
                return new GoogleLoginResponse
                {
                    Success = false,
                    Message = "Thông tin bổ sung không hợp lệ.",
                    UserInfoGoogle = null
                };
            }
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


