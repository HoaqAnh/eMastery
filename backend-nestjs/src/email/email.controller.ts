import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { ContactRequestDto } from './dto/contact-request.dto';
import type { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async send(@Body() dto: ContactRequestDto, @Res() res: Response) {
    try {
      await this.emailService.sendFeedback(dto.name, dto.message);
      return res.status(HttpStatus.OK).json('Gửi góp ý thành công.');
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(`Lỗi gửi email: ${error.message}`);
    }
  }
}
