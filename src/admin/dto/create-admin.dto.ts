import { IsNotEmpty } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    name:string;
}
