import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDetailDto } from './create-event-detail.dto';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateEventDetailDto  {
        @IsOptional()
        @IsString()
        title: string;
      
        @IsOptional()
        @IsString()
        description: string;
      
        @IsOptional()
        @IsDateString()
        eventDate: string;
      
        @IsOptional()
        @IsString()
        month: string;
      
        @IsOptional()
        @IsInt()
        day: number;
    
    
}
