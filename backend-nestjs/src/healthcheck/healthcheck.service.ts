import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class HealthcheckService {
  async checkApiKey(apiKey: string): Promise<boolean> {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const result = await ai.models.list();
      console.log('Available Models:', result);
      await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
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
