interface ChatHistoryItem {
  fromUser: boolean;
  message: string;
}

export interface ChatbotRequest {
  conversation: {
    question: string;
    chatHistory: ChatHistoryItem[];
  };
  username: string;
  gender: string;
  age: number;
  englishLevel: string;
  geminiApiKey: string;
  enableReasoning: boolean;
  enableSearching: boolean;
}

export interface ChatbotResponse {
  messageInMarkdown: string;
  suggestions: string[];
}

export const sendChatMessageService = async (
  payload: ChatbotRequest
): Promise<ChatbotResponse> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const chatEndpoint = "/Chat";

  if (!baseUrl) {
    throw new Error(
      "Lỗi cấu hình: VITE_API_BASE_URL chưa được đặt trong file .env"
    );
  }

  const url = `${baseUrl}${chatEndpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Lỗi ${response.status} từ server`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn đến chatbot:", error);
    throw error;
  }
};
