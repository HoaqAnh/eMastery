import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class ChatMessageDto {
  @IsBoolean()
  fromUser: boolean;

  @IsString()
  message: string;
}

class ConversationDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  @IsOptional()
  chatHistory: ChatMessageDto[] = [];
}

export class CreateChatDto {
  @ValidateNested()
  @Type(() => ConversationDto)
  conversation: ConversationDto;

  @IsString()
  username: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsString()
  englishLevel: string;

  @IsString()
  @IsNotEmpty()
  geminiApiKey: string;
}
