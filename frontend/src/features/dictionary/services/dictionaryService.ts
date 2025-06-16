export interface Explanation {
  pronunciation: string | null;
  meaning: string | null;
  grammarUsage: string | null;
  phrasesAndIdioms: string | null;
  synonymsAndAntonyms: string | null;
  funFactsAndTips: string | null;
  summary: string | null;
}

export interface TranslateRequest {
  word: string;
  apiKey: string;
}

export interface TranslateResponse {
  word: string;
  explanation: Explanation;
}

export const translateWordService = async (
  payload: TranslateRequest
): Promise<TranslateResponse> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const translateEndpoint = "/translate";

  if (!baseUrl) {
    throw new Error(
      "Lỗi cấu hình: VITE_API_BASE_URL chưa được đặt trong file .env"
    );
  }

  const url = `${baseUrl}${translateEndpoint}`;

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
    console.error("Lỗi khi tra từ:", error);
    throw error;
  }
};