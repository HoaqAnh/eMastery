import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ReadingPrompts } from './reading.constants';
import { GenerateReadingDto } from './dto/generate-reading.dto';
import { EvaluateGuessDto } from './dto/evaluate-guess.dto';

@Injectable()
export class ReadingService {
  async generatePassage(dto: GenerateReadingDto) {
    try {
      const ai = new GoogleGenAI({ apiKey: dto.geminiApiKey });
      const prompt = ReadingPrompts.getReadingWord(
        dto.englishLevel,
        dto.usedDescriptions,
      );

      const readingSchema = {
        type: 'object',
        properties: {
          description: { type: 'string', description: 'Câu đố bằng tiếng Anh' },
          translation: { type: 'string', description: 'Dịch nghĩa câu đố' },
          phrase: { type: 'string', description: 'Từ khóa đáp án (1 từ)' },
          phraseTranslation: {
            type: 'string',
            description: 'Nghĩa tiếng Việt của đáp án',
          },
        },
        required: ['description', 'translation', 'phrase', 'phraseTranslation'],
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: readingSchema,
          temperature: 0.7,
        },
      });

      const text =
        response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.';
      const parsed = JSON.parse(text);

      return {
        description: parsed.description,
        translation: parsed.translation,
        phrase: parsed.phrase,
        phraseTranslation: parsed.phraseTranslation,
      };
    } catch (e) {
      console.error('Generate Reading Error:', e);
      throw new Error('Không thể tạo câu hỏi lúc này.');
    }
  }

  async evaluateGuess(dto: EvaluateGuessDto) {
    try {
      const ai = new GoogleGenAI({ apiKey: dto.geminiApiKey });
      const prompt = ReadingPrompts.getEvaluation(
        dto.userGuess,
        dto.correctPhrase,
      );

      const evaluationSchema = {
        type: 'object',
        properties: {
          accuracy: {
            type: 'integer',
            description: 'Điểm số từ 0 đến 100 dựa trên độ chính xác.',
          },
          explanation: {
            type: 'string',
            description: 'Giải thích ngắn gọn bằng tiếng Việt.',
          },
          explanationEnglish: {
            type: 'string',
            description: 'Giải thích ngắn gọn bằng tiếng Anh.',
          },
        },
        required: ['accuracy', 'explanation', 'explanationEnglish'],
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: evaluationSchema,
          temperature: 0.3,
        },
      });

      const text =
        response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.';
      return JSON.parse(text);
    } catch (error) {
      console.error('Evaluation Error:', error);
      return {
        accuracy: 0,
        explanation: 'Không thể đánh giá vào lúc này. Vui lòng thử lại.',
        explanationEnglish: 'Cannot evaluate at this time. Please try again.',
      };
    }
  }
}
