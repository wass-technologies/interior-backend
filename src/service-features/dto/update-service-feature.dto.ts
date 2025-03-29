import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class UpdateServiceFeatureDto  {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name:string;

    @IsNotEmpty()
    @IsArray()
    @IsOptional()
    details:string[];
}
