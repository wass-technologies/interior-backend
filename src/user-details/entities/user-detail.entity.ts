import { Admin } from "src/admin/entities/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @Column()
    name:string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    profileImage: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    designation: string;

}
