import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateRatingDetailDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    review: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
  
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsNotEmpty()
    @IsString()
    adminId: string;
}
