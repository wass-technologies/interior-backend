import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceFeatureDto } from './create-service-feature.dto';

export class UpdateServiceFeatureDto extends PartialType(CreateServiceFeatureDto) {}
