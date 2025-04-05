import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsDateString()
    eventDate: string;
  
    @IsNotEmpty()
    @IsString()
    month: string;
  
    @IsNotEmpty()
    @IsInt()
    day: number;
}
