import { IsArray, IsOptional, IsString } from 'class-validator';
export class GenerateReadingDto {
  @IsString() englishLevel: string;
  @IsString() geminiApiKey: string;
  @IsArray() @IsOptional() usedDescriptions: string[] = [];
}
