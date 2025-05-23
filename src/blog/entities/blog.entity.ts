import { Account } from "src/account/entities/account.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100,  nullable: true })
    title: string;
  
    @Column({ type: 'varchar',  length: 55, nullable: true })
    author: string;

    @Column({ type: 'uuid', nullable: true })
    accountId:string
  
    @Column({ type: 'text', nullable: true })
    desc: string;
  
    @Column({ type: 'date', nullable: true })
    date: Date;
  
    @Column({ type: 'text', nullable: true })
    image: string;
  
    @Column({ type: 'text', nullable: true })
    imagePath: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Account, account => account.blogs, {
      onDelete: 'CASCADE',
    })
    account: Account;

    @OneToMany(() => Comment, (comments) => comments.blogPost)
    comments: Comment[];
}
