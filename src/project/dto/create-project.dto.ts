import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ProjectStatus } from "src/enum";

export class CreateProjectDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    category:number;
}
export class StatusDto{
    @IsNotEmpty()
    @IsEnum(ProjectStatus)
    status: ProjectStatus;
}

export class PaginationDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(5)
    @Max(100)
    limit: number;
  
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;
  
    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(100)
    keyword: string;

    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(100)
    category: string;
    
  }
