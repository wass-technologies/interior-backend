import { Admin } from "src/admin/entities/admin.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Project, (project) => project.category)
    projects: Project[];

    @ManyToOne(() => Admin, (admin) => admin.categories)
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
