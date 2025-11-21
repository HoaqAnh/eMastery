import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { DictionaryPrompts } from './dictionary.constants';
import { TranslateWordDto } from './dto/translate-word.dto';

@Injectable()
export class DictionaryService {
  async translate(dto: TranslateWordDto) {
    try {
      const ai = new GoogleGenAI({ apiKey: dto.ApiKey });
      const prompt = DictionaryPrompts.translate(dto.word);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const text = response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.';
      return JSON.parse(text);
    } catch (error) {
      console.error('Dictionary Error:', error);
      throw new Error('Không thể dịch từ này lúc này.');
    }
  }
}
