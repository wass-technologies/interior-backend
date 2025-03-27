import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectFeatureDto } from './create-project-feature.dto';

export class UpdateProjectFeatureDto extends PartialType(CreateProjectFeatureDto) {}
