import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"event"})
export class EventDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    eventDate: Date;

    @Column({ type: 'varchar', length: 50 })
    month: string;

    @Column({ type: 'int' })
    day: number;
    
    @Column({ type: 'text', nullable: true })
    image: string;
  
    @Column({ type: 'text', nullable: true })
    imagePath: string;

    @ManyToOne(() => Admin, (admin) => admin.events, { onDelete: 'CASCADE' })
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
