import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    file: string;

    @Column()
    fileName: string;

    @ManyToOne(() => Admin, (admin) => admin.services)
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
