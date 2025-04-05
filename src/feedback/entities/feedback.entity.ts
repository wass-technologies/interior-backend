import { Account } from "src/account/entities/account.entity";
import { Member } from "src/member/entities/member.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text', nullable: true })
    comment: string;
  
    @Column({ type: 'int', default: 0 })
    rating: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ type: 'uuid', nullable: true })
    memberId: string;

    @ManyToOne(() => Account, (account) => account.feedbacks)
    account: Account;

    @ManyToOne(() => Member, (member) => member.feedbacks, { nullable: true })
    member: Member;
      
}
