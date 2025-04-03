import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "contact" })
export class ContactusDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text', nullable: true})
    name: string;
    
    @Column({type: 'text', nullable: true})
    phoneNumber: string;
    
    @Column({type: 'text', nullable: true})
    query: string;

    @Column({type: 'text', nullable: true})
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}
