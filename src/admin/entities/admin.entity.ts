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
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 100, nullable: true })
    emailId: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    socialLink: SocialMedia[];

    userDetail:UserDetail[];

    projectCategory:ProjectCategory[];

    project:ProjectDetail[];

    projectFeatures:ProjectFeature[];

    projectImage:ProjectImage[];

    comments:CommentDetail[];

    menberDetail:MemberDetail[];

    serviceDetail: ServiceDetail[];

    serviceImage:ServiceImage[];
    
    serviceFeature:ServiceFeature[]

    ratingDetail: RatingDetail[];

    eventDetail: EventDetail[];

    contactDetail: ContactusDetail[];




}
