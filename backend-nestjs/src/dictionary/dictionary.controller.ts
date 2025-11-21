import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { TranslateWordDto } from './dto/translate-word.dto';
import type { Response } from 'express';

@Controller('translate') // Route: /api/translate
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  async translate(@Body() dto: TranslateWordDto, @Res() res: Response) {
    try {
      const result = await this.dictionaryService.translate(dto);
      return res.status(HttpStatus.OK).json({
        word: dto.word,
        explanation: result,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
