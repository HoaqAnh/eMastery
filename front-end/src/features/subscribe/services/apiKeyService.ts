interface ApiKeyServerResponse {
  message: string;
}

export interface ApiKeyValidationResult {
  isValid: boolean;
  message: string;
  status?: number;
}

export const checkApiKeyService = async (
  apiKey: string
): Promise<ApiKeyValidationResult> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKeyCheckEndpoint = "/healthcheck/check-api-key";

  if (!baseUrl) {
    console.error(
      "Lỗi cấu hình: VITE_API_BASE_URL chưa được đặt trong file .env"
    );
    return {
      isValid: false,
      message: "Lỗi cấu hình: API base URL không được tìm thấy.",
    };
  }

  const url = `${baseUrl}${apiKeyCheckEndpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ApiKey: apiKey }),
      credentials: "include"
    });

    let responseData: ApiKeyServerResponse | null = null;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      if (!response.ok) {
        return {
          isValid: false,
          message: `Lỗi ${response.status}: Phản hồi không hợp lệ từ server.`,
          status: response.status,
        };
      }

      console.error("Không thể parse JSON từ phản hồi:", jsonError);
      return {
        isValid: false,
        message: "Phản hồi từ server không đúng định dạng JSON.",
        status: response.status,
      };
    }

    if (response.ok) {
      return {
        isValid: true,
        message:
          responseData?.message ||
          "API Key hợp lệ (không có thông báo chi tiết).",
        status: response.status,
      };
    } else {
      return {
        isValid: false,
        message:
          responseData?.message ||
          `Lỗi ${response.status}: API Key không hợp lệ hoặc lỗi server.`,
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Lỗi mạng hoặc lỗi fetch khi kiểm tra API key:", error);
    return {
      isValid: false,
      message: "Không thể kết nối đến server hoặc đã xảy ra lỗi mạng.",
    };
  }
};
