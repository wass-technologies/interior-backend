import { Account } from "src/account/entities/account.entity";
import { ServiceStatus } from "src/enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column({ type: 'uuid', nullable: true })
    accountId:string

    @Column('text')
    description: string;

    @Column({ type: 'enum', enum: ServiceStatus, default: ServiceStatus.ACTIVE })
    status: ServiceStatus;

    @Column()
    file: string;

    @Column()
    fileName: string;

    @ManyToOne(() => Account, (admin) => admin.services)
    account: Account;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;    
}
