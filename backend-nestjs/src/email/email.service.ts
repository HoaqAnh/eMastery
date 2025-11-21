import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendFeedback(name: string, content: string) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');

    await this.mailerService.sendMail({
      to: adminEmail,
      subject: 'Góp ý từ người dùng (eMastery)',
      html: `
        <h2>Góp ý mới từ: ${name}</h2>
        <p>${content.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}
