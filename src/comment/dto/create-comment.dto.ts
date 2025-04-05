import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    content: string;
}
