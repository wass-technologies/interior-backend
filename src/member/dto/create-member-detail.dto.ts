import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateMemberDetailDto {
    @IsString()
    name: string;
  
    @IsString()
    designation: string;
  
    @IsObject()
    @IsOptional()
    socialMediaLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
}
