import { IsString } from "class-validator";

export class CreateMemberDetailDto {
    @IsString()
    name: string;
    
    @IsString()
    designation: string;

    @IsString()
    adminId: string;
}
