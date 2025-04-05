import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateMemberDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    designation?: string;
  
    @IsOptional()
    @IsUrl()
    linkDinLink?: string;
  
    @IsOptional()
    @IsUrl()
    twLinkl?: string;
  
    @IsOptional()
    @IsUrl()
    facLink?: string;
  
    @IsOptional()
    @IsUrl()
    insLink?: string;
}
