import { Admin } from "src/admin/entities/admin.entity";
import { ProjectDetail } from "src/project-details/entities/project-detail.entity";
import { json } from "stream/consumers";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectFeature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column({type:'json'})
    details:string[];
    
    @ManyToOne(()=> ProjectDetail,(project)=>project.features)
    @JoinColumn({name:'project_id'})
    project:ProjectDetail;
    
    @ManyToOne(() => Admin, (admin) => admin.projectFeatures, { onDelete: 'CASCADE' })
    admin: Admin;

}

