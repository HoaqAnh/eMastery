import { useState, useEffect } from "react";

interface GoogleUser {
  id: string;
  name: string;
  email: string | null;
  picture: string;
}

interface BackendAuthResponse {
  success: boolean;
  message?: string;
  user?: GoogleUser;
}

interface UseGoogleCallbackReturn {
  isLoading: boolean;
  error: string | null;
  authData: BackendAuthResponse | null;
}

export const useGoogleCallback = (): UseGoogleCallbackReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authData, setAuthData] = useState<BackendAuthResponse | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const googleError = urlParams.get("error");

      if (code || googleError) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      if (googleError) {
        setError(`Lỗi từ Google: ${googleError}`);
        return;
      }

      if (code) {
        setIsLoading(true);
        setError(null);
        setAuthData(null);

        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const callbackEndpoint = "/auth/google/callback";

        if (!baseUrl) {
          setError("Lỗi cấu hình: VITE_API_BASE_URL chưa được đặt.");
          setIsLoading(false);
          return;
        }

        const url = `${baseUrl}${callbackEndpoint}?code=${encodeURIComponent(
          code
        )}`;

        try {
          const response = await fetch(url, { method: "GET" });
          const responseData = await response.json();

          if (response.ok) {
            setAuthData({ success: true, user: responseData });
          } else {
            const failResponse: BackendAuthResponse = {
              success: false,
              message:
                responseData.message || `Lỗi ${response.status} từ server.`,
            };
            setAuthData(failResponse);
            setError(failResponse.message || "Đã xảy ra lỗi không xác định.");
          }
        } catch (e) {
          const errorMessage =
            "Không thể kết nối đến server hoặc đã xảy ra lỗi mạng.";
          setError(errorMessage);
          setAuthData({ success: false, message: errorMessage });
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuthCallback();
  }, []);

  return { isLoading, error, authData };
};