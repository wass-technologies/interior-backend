import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSettingDto {
    @IsNotEmpty()
    @IsString()
    name: string; 

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    link: string; 
}
