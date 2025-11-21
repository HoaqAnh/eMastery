import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import type { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() createChatDto: CreateChatDto, @Res() res: Response) {
    const result = await this.chatService.generateAnswer(createChatDto);

    return res.status(HttpStatus.OK).json(result);
  }
}
