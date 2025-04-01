import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @Column()
    link: string;
    
    @Column({ type: 'text', nullable: true })
    file: string;
  
    @Column({ type: 'text', nullable: true })
    fileName: string;

    @ManyToOne(() => Admin, (admin) => admin.settings)
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
