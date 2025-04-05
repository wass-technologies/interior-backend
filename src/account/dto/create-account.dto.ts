import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, MaxLength, Min, MinLength } from "class-validator";
import { ProjectStatus } from "src/enum";

export class CreateAccountDto {

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
    @Max(1000)
    offset: number;
  
    @IsOptional()
    @MinLength(0)
    @MaxLength(100)
    keyword: string;
  
    @IsOptional()
    @IsEnum(ProjectStatus)
    status: ProjectStatus;
  }
