import { useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRegistration } from "@/context/RegistrationContext";
import {
  sendChatMessageService,
  type ChatbotRequest,
  //   type ChatbotResponse,
} from "../services/chatbotService";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export const useChatbot = () => {
  const { registrationData } = useRegistration();
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    "chatHistory",
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (question: string) => {
      if (isLoading || !question.trim()) return;

      const userMessage: ChatMessage = { role: "user", content: question };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      setIsLoading(true);
      setError(null);

      try {
        const historyForAPI = updatedMessages.slice(0, -1).map((msg) => ({
          fromUser: msg.role === "user",
          message: msg.content,
        }));

        const payload: ChatbotRequest = {
          conversation: {
            question: question,
            chatHistory: historyForAPI,
            // imagesAsBase64: [],
          },

          username: registrationData.fullName || "User",
          gender: registrationData.gender || "other",
          age: Number(registrationData.age) || 0,
          englishLevel: registrationData.level || "A1",
          geminiApiKey: registrationData.apiKey || "",
          enableReasoning: false,
          enableSearching: false,
        };

        const response = await sendChatMessageService(payload);

        const botMessage: ChatMessage = {
          role: "model",
          content: response.messageInMarkdown,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Đã có lỗi xảy ra.";
        setError(errorMessage);
        // const errorBotMessage: ChatMessage = {
        //   role: "model",
        //   content: `Vui lòng thử lại sau.`,
        // };
        // setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, registrationData, messages, setMessages]
  );
  const clearChat = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  return { messages, isLoading, error, sendMessage, clearChat };
};
