import { Account } from "src/account/entities/account.entity";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'varchar', length: 255, nullable: true })
    linkDinLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    twLinkl: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    facLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    insLink: string;
    
    @ManyToOne(()=>Account, (account)=>account.members)
    account:Account;

    @OneToMany(() => Feedback, (feedback) => feedback.member)
    feedbacks: Feedback[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
