import { Blog } from "src/blogs/entities/blog.entity";
import { Category } from "src/category/entities/category.entity";
import { EventDetail } from "src/events/entities/event-detail.entity";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { Member } from "src/member/entities/member.entity";
import { Project } from "src/projects/entities/project.entity";
import { Service } from "src/services/entities/service.entity";
import { Setting } from "src/settings/entities/setting.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    emailId: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Blog, (blog) => blog.admin, { cascade: true })
    blogs: Blog[];

    @OneToMany(() => Category, (category) => category.admin, { cascade: true })
    categories: Category[];

    @OneToMany(() => Project, (project) => project.admin, { cascade: true })
    projects: Project[];

    @OneToMany(() => Member, (member) => member.admin, { cascade: true })
    members: Member[];

    @OneToMany(() => Setting, (setting) => setting.admin, { cascade: true })
    settings: Setting[];

    @OneToMany(() => Service, (service) => service.admin, { cascade: true })
    services: Service[];

    @OneToMany(() => Feedback, (feedback) => feedback.admin, { cascade: true })
    feedbacks: Feedback[];

    @OneToMany(()=>EventDetail, (event)=>event.admin)
    events:EventDetail[];
}


