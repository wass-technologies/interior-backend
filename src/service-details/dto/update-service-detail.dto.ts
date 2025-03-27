import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDetailDto } from './create-service-detail.dto';

export class UpdateServiceDetailDto extends PartialType(CreateServiceDetailDto) {}
