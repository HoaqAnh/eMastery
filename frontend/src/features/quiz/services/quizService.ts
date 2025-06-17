export interface GenerateReadingRequest {
  englishLevel: string;
  geminiApiKey: string;
  usedDescriptions: string[];
}

export interface GenerateReadingResponse {
  description: string;
  translation: string;
  phrase: string;
  phraseTranslation: string;
}

export interface EvaluateReadingRequest {
  userGuess: string;
  correctPhrase: string;
  geminiApiKey: string;
}

export interface EvaluateReadingResponse {
  accuracy: number;
  explanation: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const generateReading = async (
  data: GenerateReadingRequest
): Promise<GenerateReadingResponse> => {
  const url = `${API_BASE_URL}/reading/generate`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đã xảy ra lỗi khi tạo bài đọc");
    }

    const responseData: GenerateReadingResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Lỗi khi gọi API tạo bài đọc:", error);
    throw error;
  }
};

export const evaluateReading = async (
  data: EvaluateReadingRequest
): Promise<EvaluateReadingResponse> => {
  const url = `${API_BASE_URL}/reading/evaluate`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đã có lỗi xảy ra khi đánh giá");
    }

    const responseData: EvaluateReadingResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Lỗi khi gọi API đánh giá:", error);
    throw error;
  }
};