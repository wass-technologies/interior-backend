import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
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
