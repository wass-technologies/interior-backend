import { Admin } from "src/admin/entities/admin.entity";
import { ServiceStatus } from "src/enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'enum', enum: ServiceStatus, default: ServiceStatus.ACTIVE })
    status: ServiceStatus;

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
