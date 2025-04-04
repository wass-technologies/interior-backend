import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    whatsApp: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    linkDin: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    twiter: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    facebook: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    instagram: string;
    
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
