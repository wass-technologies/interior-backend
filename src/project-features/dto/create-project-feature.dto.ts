import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateProjectFeatureDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsArray()
    details:string[];

    @IsString()
    @IsNotEmpty()
    projectId:string;

}
export class PaginationDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(10)
    @Max(50)
    limit: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;

    @IsOptional()
    keyword: string;

    @IsOptional()
    project: any;
}