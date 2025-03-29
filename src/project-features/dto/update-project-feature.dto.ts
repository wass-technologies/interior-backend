
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateProjectFeatureDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name:string;

    @IsNotEmpty()
    @IsArray()
    @IsOptional()
    details:string[];
}
