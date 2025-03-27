import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RatingDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    designation: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    profileImage: string;

    @Column({ type: 'text' })
    review: string;

    @Column({ type: 'int', default: 5 })
    rating: number;
}
