import { ProjectCategory } from "src/project-category/entities/project-category.entity";
import { ProjectFeature } from "src/project-features/entities/project-feature.entity";
import { ProjectImage } from "src/project-image/entities/project-image.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectDetail {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @Column({type:'text', nullable:true})
    description:string;

    @ManyToMany(()=> ProjectCategory,(category)=>category.projects)
    @JoinColumn({name:'catecory_id'})
    category: ProjectCategory[]

    @OneToMany(()=>ProjectImage,(image)=>image.project)
    image:ProjectImage[]

    @OneToMany(()=>ProjectFeature,(feature)=>feature.project)
    features:ProjectFeature[]
}
