import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 55, nullable: true })
    name:string;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({default: 0 })
    rating: number;

    @Column()
    profileImage:string

    @ManyToOne(() => Admin, (admin) => admin.feedbacks)
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
