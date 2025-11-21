import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { GenerateReadingDto } from './dto/generate-reading.dto';
import { EvaluateGuessDto } from './dto/evaluate-guess.dto';
import type { Response } from 'express';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post('generate')
  async generate(@Body() dto: GenerateReadingDto, @Res() res: Response) {
    try {
      const result = await this.readingService.generatePassage(dto);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    }
  }

  @Post('evaluate')
  async evaluate(@Body() dto: EvaluateGuessDto, @Res() res: Response) {
    try {
      const result = await this.readingService.evaluateGuess(dto);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    }
  }
}
