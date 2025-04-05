import { Account } from "src/account/entities/account.entity";
import { Category } from "src/category/entities/category.entity";
import { ProjectStatus } from "src/enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column({ type: 'uuid', nullable: true })
    accountId:string

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({ type: 'text', nullable: true })
    file: string;
  
    @Column({ type: 'text', nullable: true })
    fileName: string;

    @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.ACTIVE })
    status: ProjectStatus;

    @ManyToOne(() => Account, (account) => account.projects)
    account: Account;

    @ManyToOne(() => Category, (category) => category.projects, { nullable: true })
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
