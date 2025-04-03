import { Blog } from "src/blogs/entities/blog.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "comment" })
export class CommentDetail {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column({ type: 'text' })
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
    blogPost: Blog;

}
