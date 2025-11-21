import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { SaveAdditionalInfoDto } from './dto/save-info.dto';
import type { Response } from 'express';

@Controller('auth') // Route: /api/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API: POST /api/auth/google-login
  @Post('google-login')
  async googleLogin(@Body() dto: GoogleLoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.loginWithGoogle(dto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  // API: POST /api/auth/save-info
  @Post('save-info')
  async saveInfo(@Body() dto: SaveAdditionalInfoDto, @Res() res: Response) {
    const result = await this.authService.saveAdditionalInfo(dto);
    return res.status(HttpStatus.OK).json(result);
  }
}
