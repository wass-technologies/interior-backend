import { Admin } from "src/admin/entities/admin.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Member {
        @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    designation: string;

    @Column({ type: 'text', nullable: true })
    file: string;
  
    @Column({ type: 'text', nullable: true })
    fileName: string;

    @Column()
    whatsApp: string;

    @Column()
    linkDin: string;

    @Column()
    twiter: string;

    @Column()
    facebook: string;

    @Column()
    instagram: string;
    
    @ManyToOne(()=>Admin, (admin)=>admin.members)
    admin:Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
