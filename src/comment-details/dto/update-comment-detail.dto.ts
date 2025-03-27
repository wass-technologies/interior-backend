import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDetailDto } from './create-comment-detail.dto';

export class UpdateCommentDetailDto extends PartialType(CreateCommentDetailDto) {}
