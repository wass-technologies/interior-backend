import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contactus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text', nullable: true})
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    emailId: string;
    
    @Column({type: 'text', nullable: true})
    phoneNumber: string;
    
    @Column({type: 'text', nullable: true})
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}
