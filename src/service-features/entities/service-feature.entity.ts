import { Admin } from "src/admin/entities/admin.entity";
import { ServiceDetail } from "src/service-details/entities/service-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceFeature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column({type:'json'})
    details:string[];
    
    @ManyToOne(()=> ServiceDetail,(service)=>service.features)
    @JoinColumn({name:'service_id'})
    service:ServiceDetail;
    
    @ManyToOne(() => Admin, (admin) => admin.serviceFeatures, { onDelete: 'CASCADE' })
    admin: Admin;
    
}
