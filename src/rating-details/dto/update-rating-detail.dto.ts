import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDetailDto } from './create-rating-detail.dto';

export class UpdateRatingDetailDto extends PartialType(CreateRatingDetailDto) {}
