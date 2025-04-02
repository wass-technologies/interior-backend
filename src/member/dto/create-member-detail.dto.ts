import { IsString } from "class-validator";

export class CreateMemberDetailDto {
    @IsString()
    name: string;
    
    @IsString()
    designation: string;
}
