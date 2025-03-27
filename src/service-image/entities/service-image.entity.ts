import { Admin } from "src/admin/entities/admin.entity";
import { ServiceDetail } from "src/service-details/entities/service-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ServiceImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    file: string;
  
    @Column({ type: 'text', nullable: true })
    fileName: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> ServiceDetail,(service)=>service.image)
    @JoinColumn({name:'service_id'})
    service:ServiceDetail;

    @ManyToOne(() => Admin, (admin) => admin.serviceImages, { onDelete: 'CASCADE' })
    admin: Admin;

}
