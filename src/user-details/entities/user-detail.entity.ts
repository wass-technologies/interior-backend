import { Admin } from "src/admin/entities/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @ManyToOne(() => Admin, (admin) => admin.userDetails, { onDelete: 'CASCADE' })
    admin:Admin;

}
