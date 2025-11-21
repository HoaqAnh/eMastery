import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ReadingModule } from './reading/reading.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    DictionaryModule,
    ReadingModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
