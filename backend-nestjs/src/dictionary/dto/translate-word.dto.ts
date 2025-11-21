import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class TranslateWordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\-\s]+$/, { message: 'Từ vựng chỉ được chứa chữ cái.' })
  word: string;

  @IsString()
  @IsNotEmpty()
  ApiKey: string;
}
