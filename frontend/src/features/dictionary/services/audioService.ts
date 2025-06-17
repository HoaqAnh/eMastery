export interface NotFoundResponse {
  title: string;
  message: string;
  resolution: string;
}

export interface Phonetic {
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
  text?: string;
}

export interface WordAudioResponse {
  word: string;
  phonetics: Phonetic[];
}

export const getWordAudioService = async (
  word: string
): Promise<string | null> => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    const data: WordAudioResponse[] | NotFoundResponse = await response.json();

    if (!response.ok || (data && (data as NotFoundResponse).title)) {
      console.warn(`Không tìm thấy định nghĩa cho từ: "${word}"`);
      return null;
    }

    if (Array.isArray(data) && data.length > 0) {
      const phonetics = data[0].phonetics;
      if (phonetics && phonetics.length > 0) {
        const phoneticWithAudio = phonetics.find(
          (p) => p.audio && p.audio.trim() !== ""
        );
        if (phoneticWithAudio) {
          return phoneticWithAudio.audio;
        }
      }
    }

    console.warn(`Không tìm thấy audio cho từ: "${word}"`);
    return null;
  } catch (error) {
    console.error(`Lỗi khi gọi API lấy audio cho từ "${word}":`, error);
    throw new Error("Đã xảy ra lỗi khi kết nối đến máy chủ tra cứu audio.");
  }
};
