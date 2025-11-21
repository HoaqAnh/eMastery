import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatPrompts } from './chat.constants';

@Injectable()
export class ChatService {
  async generateAnswer(dto: CreateChatDto) {
    try {
      const ai = new GoogleGenAI({ apiKey: dto.geminiApiKey });
      const systemInstructionText = ChatPrompts.getBasicInstruction(
        dto.username,
        dto.gender,
        dto.age,
        dto.englishLevel,
      );

      const contents = [
        ...dto.conversation.chatHistory
          .filter((msg) => msg.message && msg.message !== 'string')
          .map((msg) => ({
            role: msg.fromUser ? 'user' : 'model',
            parts: [{ text: msg.message }],
          })),
        { role: 'user', parts: [{ text: dto.conversation.question }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstructionText,
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const text = response.text || 'Có lỗi xảy ra ở phía máy chủ, vui lòng thử lại sau.';

      return this.parseJsonResponse(text);
    } catch (error) {
      console.error('Chat Service Error:', error);
      if (error.status) {
        console.error(`Status: ${error.status}, Message: ${error.message}`);
      }

      return {
        MessageInMarkdown:
          'Xin lỗi, hệ thống đang gặp sự cố kết nối. Vui lòng thử lại sau.',
        Suggestions: [],
      };
    }
  }

  private parseJsonResponse(text: string | null) {
    if (!text) return { MessageInMarkdown: '', Suggestions: [] };
    try {
      const cleaned = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      return JSON.parse(cleaned);
    } catch (e) {
      return {
        MessageInMarkdown: text,
        Suggestions: [],
      };
    }
  }
}
