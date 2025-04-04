import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDetailDto } from './create-member-detail.dto';
import { IsObject, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMemberDetailDto{
    @IsString()
    designation: string;
  
    @IsOptional()
    @IsString()
    whatsApp: string;

    @IsOptional()
    @IsUrl()
    linkDin?: string;

    @IsOptional()
    @IsUrl()
    twiter?: string;

    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsOptional()
    @IsUrl()
    instagram?: string;
}
