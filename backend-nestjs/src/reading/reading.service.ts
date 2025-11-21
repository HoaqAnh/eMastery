import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ReadingPrompts } from './reading.constants';
import { GenerateReadingDto } from './dto/generate-reading.dto';
import { EvaluateGuessDto } from './dto/evaluate-guess.dto';

@Injectable()
export class ReadingService {
  async generatePassage(dto: GenerateReadingDto) {
    const ai = new GoogleGenAI({ apiKey: dto.geminiApiKey });
    const prompt = ReadingPrompts.getReadingWord(
      dto.englishLevel,
      dto.usedDescriptions,
    );

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { responseMimeType: 'application/json' },
    });

    return JSON.parse(
      response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.',
    );
  }

  async evaluateGuess(dto: EvaluateGuessDto) {
    const ai = new GoogleGenAI({ apiKey: dto.geminiApiKey });
    const prompt = ReadingPrompts.getEvaluation(
      dto.userGuess,
      dto.correctPhrase,
    );

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { responseMimeType: 'application/json' },
    });

    return JSON.parse(
      response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.',
    );
  }
}
