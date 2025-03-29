import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, Max, Min } from "class-validator";

export class CreateServiceDetailDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID()
    @IsNotEmpty()
    adminId: string;

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
    keyword?: string;
}

