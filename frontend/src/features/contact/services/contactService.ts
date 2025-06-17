export interface ContactFormPayload {
  name: string;
  message: string;
}

export const sendContactEmailService = async (
  payload: ContactFormPayload
): Promise<boolean> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const emailEndpoint = "/email";

  if (!baseUrl) {
    throw new Error(
      "Lỗi cấu hình: VITE_API_BASE_URL chưa được đặt trong file .env"
    );
  }

  const url = `${baseUrl}${emailEndpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(
        `Gửi thất bại. Máy chủ phản hồi với mã lỗi: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Lỗi mạng hoặc lỗi khi gửi phản hồi:", error);
    throw error;
  }
};