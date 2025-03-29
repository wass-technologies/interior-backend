import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDetailDto } from './create-project-detail.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProjectDetailDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @IsOptional()
    categoryId: number; 
}
