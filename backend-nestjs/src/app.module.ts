import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ReadingModule } from './reading/reading.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: config.get('EMAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASS'),
          },
        },
        defaults: {
          from: config.get('EMAIL_FROM'),
        },
      }),
    }),
    ChatModule,
    DictionaryModule,
    ReadingModule,
    AuthModule,
    EmailModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
