import { IsObject, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateMemberDetailDto {
    @IsString()
    name: string;
  
    @IsString()
    designation: string;
  
    @IsOptional()
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
