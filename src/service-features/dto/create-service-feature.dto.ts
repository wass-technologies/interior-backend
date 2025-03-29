import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, IsNumber, Min, Max, IsOptional } from "class-validator";

export class CreateServiceFeatureDto {@IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsArray()
    details:string[];

    @IsString()
    @IsNotEmpty()
    serviceId:string;

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
    service: any;
}
