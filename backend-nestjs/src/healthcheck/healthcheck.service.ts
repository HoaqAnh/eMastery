import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class HealthcheckService {
  async checkApiKey(apiKey: string): Promise<boolean> {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });

      await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: 'Hi' }] }],
        config: { maxOutputTokens: 10 },
      });

      return true;
    } catch (error) {
      console.error('Healthcheck error:', error.message);
      return false;
    }
  }
}
