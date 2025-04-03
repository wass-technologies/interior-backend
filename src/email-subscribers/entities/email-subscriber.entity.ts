import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"subscriber"})
export class EmailSubscriber {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text', nullable: true })
    email: string;
  
    @CreateDateColumn()
    createdAt: Date;
}
