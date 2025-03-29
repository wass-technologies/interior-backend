import { Admin } from "src/admin/entities/admin.entity";
import { UserDetail } from "src/user-details/entities/user-detail.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RatingDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    review: string;

    @Column({ type: 'int', default: 5 })
    rating: number;

    @ManyToOne(() => UserDetail, (user) => user.id, { onDelete: 'CASCADE' })
    user: UserDetail;
    
    @ManyToOne(()=>Admin,(admin)=>admin.rating,{ onDelete: 'CASCADE' })
    admin:Admin;
}
