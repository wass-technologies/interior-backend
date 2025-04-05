import { Account } from "src/account/entities/account.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column({ type: 'uuid', nullable: true })
    accountId:string

    @OneToMany(() => Project, (project) => project.category)
    projects: Project[];

    @ManyToOne(() => Account, (admin) => admin.categories)
    account: Account;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
