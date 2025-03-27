import { Admin } from "src/admin/entities/admin.entity";
import { SocialMedia } from "src/social-media/entities/social-media.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MemberDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    designation: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    profileImage: string;

    @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.member, { cascade: true })
    socialLinks: SocialMedia[];

    @ManyToOne(()=>Admin, (admin)=>admin.members)
    admin:Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}
