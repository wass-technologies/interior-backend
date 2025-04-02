import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ServiceStatus } from "src/enum";

export class CreateServiceDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    description:string;
}
export class StatusDto{
    @IsNotEmpty()
    @IsEnum(ServiceStatus)
    status: ServiceStatus;
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

    
  }
