import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class ContactRequestDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() message: string;
}
