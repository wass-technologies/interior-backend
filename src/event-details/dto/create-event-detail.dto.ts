import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
export class CreateEventDetailDto {
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

    adminId:string

}
