import { Admin } from "src/admin/entities/admin.entity";
import { ProjectCategory } from "src/project-category/entities/project-category.entity";
import { ProjectFeature } from "src/project-features/entities/project-feature.entity";
import { ProjectImage } from "src/project-image/entities/project-image.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectDetail {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @Column({type:'text', nullable:true})
    description:string;

    @ManyToOne(() => ProjectCategory, (category) => category.projects, { onDelete: 'CASCADE' })
    category: ProjectCategory;

    @OneToMany(()=>ProjectImage,(image)=>image.project)
    image:ProjectImage[];

    @OneToMany(()=>ProjectFeature,(feature)=>feature.project)
    features:ProjectFeature[];

    @ManyToOne(() => Admin, (admin) => admin.projects, { onDelete: 'CASCADE' })
    admin: Admin;
}
