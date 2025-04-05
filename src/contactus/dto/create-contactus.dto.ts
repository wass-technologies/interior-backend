import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContactusDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsEmail()
    @IsNotEmpty()
    emailId: string;
  
    @IsNotEmpty()
    phoneNumber?: string;
  

    @IsString()
    @IsNotEmpty()
    message: string;
}
