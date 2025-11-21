import { IsNotEmpty, IsString } from 'class-validator';

export class CheckApiKeyDto {
  @IsString({ message: 'API Key phải là chuỗi ký tự.' })
  @IsNotEmpty({ message: 'API Key không được để trống.' })
  ApiKey: string;
}
