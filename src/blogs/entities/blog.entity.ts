import { Admin } from "src/admin/entities/admin.entity";
import { CommentDetail } from "src/comment-details/entities/comment-detail.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100,  nullable: true })
    title: string;
  
    @Column({ type: 'varchar',  length: 55, nullable: true })
    author: string;
  
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

    @ManyToOne(() => Admin, (admin) => admin.projects, { onDelete: 'CASCADE' })
    admin: Admin;

    @OneToMany(()=> CommentDetail,(comment)=>comment.blogPost)
    comments:CommentDetail[];
  
}
