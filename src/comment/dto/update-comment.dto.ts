import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
        @IsNotEmpty()
        @IsString()
        @MaxLength(500)
        content: string;
    }

