import { PartialType } from '@nestjs/mapped-types';
import { CreateContactusDetailDto } from './create-contactus-detail.dto';

export class UpdateContactusDetailDto extends PartialType(CreateContactusDetailDto) {}
