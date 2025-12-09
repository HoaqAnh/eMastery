import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { DictionaryPrompts } from './dictionary.constants';
import { TranslateWordDto } from './dto/translate-word.dto';

@Injectable()
export class DictionaryService {
  async translate(dto: TranslateWordDto) {
    try {
      const ai = new GoogleGenAI({ apiKey: dto.apiKey });

      const explanationSchema = {
        type: 'object',
        properties: {
          pronunciation: {
            type: 'string',
            nullable: true,
            description:
              'Phiên âm IPA và cách đọc tiếng Việt. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          meaning: {
            type: 'string',
            nullable: true,
            description:
              'Giải nghĩa chi tiết, chia theo loại từ. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          grammarUsage: {
            type: 'string',
            nullable: true,
            description:
              'Cấu trúc ngữ pháp và cách dùng. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          phrasesAndIdioms: {
            type: 'string',
            nullable: true,
            description:
              'Thành ngữ và cụm từ liên quan. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          synonymsAndAntonyms: {
            type: 'string',
            nullable: true,
            description:
              'Từ đồng nghĩa và trái nghĩa. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          funFactsAndTips: {
            type: 'string',
            nullable: true,
            description:
              'Mẹo ghi nhớ hoặc sự thật thú vị. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
          summary: {
            type: 'string',
            nullable: true,
            description:
              'Tổng kết ngắn gọn. Dùng Markdown để trình bày rõ ràng. Không cần tiêu đề chỉ cần nội dung.',
          },
        },
        required: [
          'pronunciation',
          'meaning',
          'grammarUsage',
          'phrasesAndIdioms',
          'synonymsAndAntonyms',
          'funFactsAndTips',
          'summary',
        ],
      };

      const prompt = DictionaryPrompts.translate(dto.word);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: explanationSchema,
          temperature: 0.5,
        },
      });

      const text =
        response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.';

      if (!text) throw new Error('Không nhận được dữ liệu từ AI');

      const parsed = JSON.parse(text);

      return {
        pronunciation: parsed.pronunciation || null,
        meaning: parsed.meaning || null,
        grammarUsage: parsed.grammarUsage || null,
        phrasesAndIdioms: parsed.phrasesAndIdioms || null,
        synonymsAndAntonyms: parsed.synonymsAndAntonyms || null,
        funFactsAndTips: parsed.funFactsAndTips || null,
        summary: parsed.summary || null,
      };
    } catch (error) {
      console.error('Dictionary Error:', error);
      throw new Error('Không thể dịch từ này lúc này.');
    }
  }
}
