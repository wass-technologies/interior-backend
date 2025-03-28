import { CommentDetail } from "src/comment-details/entities/comment-detail.entity";
import { ContactusDetail } from "src/contactus-details/entities/contactus-detail.entity";
import { EventDetail } from "src/event-details/entities/event-detail.entity";
import { MemberDetail } from "src/member-detail/entities/member-detail.entity";
import { ProjectCategory } from "src/project-category/entities/project-category.entity";
import { ProjectDetail } from "src/project-details/entities/project-detail.entity";
import { ProjectFeature } from "src/project-features/entities/project-feature.entity";
import { ProjectImage } from "src/project-image/entities/project-image.entity";
import { RatingDetail } from "src/rating-details/entities/rating-detail.entity";
import { ServiceDetail } from "src/service-details/entities/service-detail.entity";
import { ServiceFeature } from "src/service-features/entities/service-feature.entity";
import { ServiceImage } from "src/service-image/entities/service-image.entity";
import { SocialMedia } from "src/social-media/entities/social-media.entity";
import { UserDetail } from "src/user-details/entities/user-detail.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    name:string;

    @Column({type: 'varchar', length: 100, nullable: true })
    emailId: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserDetail, (userDetail) => userDetail.admin, { cascade: true })
    userDetails: UserDetail[];

    @OneToMany(() => ProjectCategory, (category) => category.admin, { cascade: true })
    projectCategories: ProjectCategory[];

    @OneToMany(() => ProjectDetail, (project) => project.admin, { cascade: true })
    projects: ProjectDetail[];

    @OneToMany(() => ProjectFeature, (feature) => feature.admin, { cascade: true })
    projectFeatures: ProjectFeature[];

    @OneToMany(() => ProjectImage, (image) => image.admin, { cascade: true })
    projectImages: ProjectImage[];

    @OneToMany(() => MemberDetail, (member) => member.admin, { cascade: true })
    members: MemberDetail[];

    @OneToMany(() => ServiceDetail, (service) => service.admin, { cascade: true })
    services: ServiceDetail[];

    @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.admin, { cascade: true })
    serviceImages: ServiceImage[];

    @OneToMany(() => ServiceFeature, (serviceFeature) => serviceFeature.admin, { cascade: true })
    serviceFeatures: ServiceFeature[];

    @OneToMany(() => EventDetail, (event) => event.admin, { cascade: true })
    events: EventDetail[];

    @OneToMany(()=> SocialMedia,(socialMedia)=> socialMedia.admin)
    socialMedia:SocialMedia[]

}
