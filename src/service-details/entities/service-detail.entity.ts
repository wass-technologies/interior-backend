import { Admin } from "src/admin/entities/admin.entity";
import { ServiceFeature } from "src/service-features/entities/service-feature.entity";
import { ServiceImage } from "src/service-image/entities/service-image.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceDetail {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @Column({type:'text', nullable:true})
    description:string;

    @OneToMany(()=>ServiceImage,(image)=>image.service)
    image:ServiceImage[]

    @OneToMany(()=>ServiceFeature,(feature)=>feature.project)
    features:ServiceFeature[]

    @ManyToOne(() => Admin, (admin) => admin.services, { onDelete: 'CASCADE' })
    admin: Admin;
}
