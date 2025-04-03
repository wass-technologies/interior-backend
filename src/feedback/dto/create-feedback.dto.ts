import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

}
