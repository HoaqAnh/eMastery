export interface GenerateReadingRequest {
  englishLevel: string;
  geminiApiKey: string;
}

export interface GenerateReadingResponse {
  description: string;
  translation: string;
  phrase: string;
  phraseTranslation: string;
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
      throw new Error(errorData.message || "Something went wrong");
    }

    const responseData: GenerateReadingResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error generating reading:", error);
    throw error;
  }
};
