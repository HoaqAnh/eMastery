import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { CheckApiKeyDto } from './dto/check-api-key.dto';
import type { Response } from 'express';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Post('check-api-key')
  async checkApiKey(
    @Body() checkApiKeyDto: CheckApiKeyDto,
    @Res() res: Response,
  ) {
    const isValid = await this.healthcheckService.checkApiKey(
      checkApiKeyDto.ApiKey,
    );

    if (isValid) {
      return res.status(HttpStatus.OK).json({ message: 'API Key hợp lệ.' });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'API Key không hợp lệ.' });
    }
  }
}
