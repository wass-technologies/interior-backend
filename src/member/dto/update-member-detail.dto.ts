import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDetailDto } from './create-member-detail.dto';

export class UpdateMemberDetailDto extends PartialType(CreateMemberDetailDto) {}
