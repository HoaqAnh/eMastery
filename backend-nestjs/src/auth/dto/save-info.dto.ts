import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class SaveAdditionalInfoDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsString()
  @IsOptional()
  level?: string = 'A1';
}
