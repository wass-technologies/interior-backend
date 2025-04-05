import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSettingDto { 
  
    @IsUrl()
    @IsOptional()
    fbLink?: string; 
  
    @IsUrl()
    @IsOptional()
    twLink?: string; 
  
    @IsUrl()
    @IsOptional()
    instaLink?: string; 
  
    @IsUrl()
    @IsOptional()
    linkdinLink?: string;
}
