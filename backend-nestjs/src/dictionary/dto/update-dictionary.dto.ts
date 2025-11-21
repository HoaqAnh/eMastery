import { PartialType } from '@nestjs/mapped-types';
import { CreateDictionaryDto } from './create-dictionary.dto';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {}
