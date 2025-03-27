import { ProjectDetail } from "src/project-details/entities/project-detail.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProjectCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    name:string;

    @Column({type:'text', nullable:true})
    description:string;

    @OneToMany(()=>ProjectDetail,(project)=>project.category)
    projects:ProjectDetail[]

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;



}
