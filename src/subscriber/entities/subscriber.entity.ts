import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscriber {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text', nullable: true })
    email: string;
  
    @CreateDateColumn()
    createdAt: Date;
}
