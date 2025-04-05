import { Blog } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    email: string;
  
    @Column({type: 'text'})
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
    blogPost: Blog;
}
