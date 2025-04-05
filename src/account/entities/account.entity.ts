import { Blog } from "src/blog/entities/blog.entity";
import { Category } from "src/category/entities/category.entity";
import { Event } from "src/event/entities/event.entity";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { Member } from "src/member/entities/member.entity";
import { Project } from "src/project/entities/project.entity";
import { Service } from "src/service/entities/service.entity";
import { Setting } from "src/settings/entities/setting.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'varchar', length: 55, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    emailId: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Blog, (blog) => blog.account, { cascade: true })
    blogs: Blog[];

    @OneToMany(() => Category, (category) => category.account, { cascade: true })
    categories: Category[];

    @OneToMany(() => Project, (project) => project.account, { cascade: true })
    projects: Project[];

    @OneToMany(() => Member, (member) => member.account, { cascade: true })
    members: Member[];

    @OneToMany(() => Setting, (setting) => setting.account, { cascade: true })
    settings: Setting[];

    @OneToMany(() => Service, (service) => service.account, { cascade: true })
    services: Service[];

    @OneToMany(() => Feedback, (feedback) => feedback.account, { cascade: true })
    feedbacks: Feedback[];

    @OneToMany(()=>Event, (event)=>event.account)
    events:Event[];
}
