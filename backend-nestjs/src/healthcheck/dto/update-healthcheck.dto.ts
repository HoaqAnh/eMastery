import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthcheckDto } from './create-healthcheck.dto';

export class UpdateHealthcheckDto extends PartialType(CreateHealthcheckDto) {}
