import { Admin } from "src/admin/entities/admin.entity";
import { ProjectDetail } from "src/project-details/entities/project-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProjectImage {
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

    @ManyToOne(()=> ProjectDetail,(project)=>project.image)
    @JoinColumn({name:'project_id'})
    project:ProjectDetail;

    @ManyToOne(() => Admin, (admin) => admin.projectImages, { onDelete: 'CASCADE' })
    admin: Admin;

}
