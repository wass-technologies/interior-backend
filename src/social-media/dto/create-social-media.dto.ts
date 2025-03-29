import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, Max, IsOptional } from "class-validator";

export class CreateSocialMediaDto {
    platform: string;
    link: string;
    adminId?: string;
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

