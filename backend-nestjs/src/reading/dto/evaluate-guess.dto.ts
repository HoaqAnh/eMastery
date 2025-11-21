import { IsString } from 'class-validator';
export class EvaluateGuessDto {
  @IsString() userGuess: string;
  @IsString() correctPhrase: string;
  @IsString() geminiApiKey: string;
}
