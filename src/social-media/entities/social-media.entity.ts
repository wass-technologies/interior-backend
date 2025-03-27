import { Admin } from "src/admin/entities/admin.entity";
import { MemberDetail } from "src/member-detail/entities/member-detail.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SocialMedia {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar',length:225})
    platform:string;

    @Column({type:'varchar',length:600})
    link:string;

    @ManyToOne(()=>Admin, (admin)=> admin.socialMedia)
    admin:Admin;

    @ManyToOne(()=>MemberDetail, (member)=> member.socialLinks)
    member:MemberDetail;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
