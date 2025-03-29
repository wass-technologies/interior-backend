import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, Max, IsOptional, IsUUID } from "class-validator";

export class CreateSocialMediaDto {
    @IsNotEmpty()
    platform: string;

    @IsNotEmpty()
    link: string;

    @IsOptional()
    @IsUUID()
    adminId: string;

    @IsOptional()
    @IsUUID()
    memberId?: string;
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

