import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDetailDto } from './create-member-detail.dto';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDetailDto{
        @IsString()
        designation: string;
      
        @IsObject()
        @IsOptional()
        socialMediaLinks?: {
          facebook?: string;
          twitter?: string;
          linkedin?: string;
          instagram?: string;
        };
}
