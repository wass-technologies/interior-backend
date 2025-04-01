import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
  }