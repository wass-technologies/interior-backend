import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateContactusDetailDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    phoneNumber: string;
    
    @IsNotEmpty()
    query: string;

    @IsOptional()
    message: string;
}
