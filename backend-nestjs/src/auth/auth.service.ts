import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { SaveAdditionalInfoDto } from './dto/save-info.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      this.configService.get<string>('GOOGLE_REDIRECT_URI'),
    );
  }

  async loginWithGoogle(dto: GoogleLoginDto) {
    try {
      const { tokens } = await this.googleClient.getToken(dto.code);

      if (!tokens.id_token) {
        throw new UnauthorizedException(
          'Không thể lấy được IdToken từ Google.',
        );
      }

      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Token không hợp lệ.');
      }

      return {
        success: true,
        message: `Chào mừng ${payload.name}! Đăng nhập thành công.`,
        fullName: payload.name,
        // idToken: tokens.id_token,
        // userInfoGoogle: {
        //   email: payload.email,
        //   fullName: payload.name,
        //   picture: payload.picture,
        //   gender: null,
        //   age: 0,
        // },
      };
    } catch (error) {
      console.error('Google Login Error:', error);
      throw new InternalServerErrorException(
        'Lỗi khi xác thực với Google: ' + error.message,
      );
    }
  }

  async saveAdditionalInfo(dto: SaveAdditionalInfoDto) {
    return {
      success: true,
      message: `Chào mừng ${dto.name}! Hoàn tất thông tin thành công.`,
      fullName: dto.name,
      // userInfoGoogle: {
      //   email: dto.email,
      //   fullName: dto.name,
      //   gender: dto.gender,
      //   age: dto.age,
      //   level: dto.level || 'A1',
      // },
    };
  }
}
