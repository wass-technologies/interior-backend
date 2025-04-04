import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSettingDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    whatsApp: string;

    @IsOptional()
    @IsUrl()
    linkDin?: string;

    @IsOptional()
    @IsUrl()
    twiter?: string;
    
    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsOptional()
    @IsUrl()
    instagram?: string;

}
