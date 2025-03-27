import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { ServiceDetailsModule } from './service-details/service-details.module';
import { MemberDetailModule } from './member-detail/member-detail.module';
import { RatingDetailsModule } from './rating-details/rating-details.module';
import { EventDetailsModule } from './event-details/event-details.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { ProjectCategoryModule } from './project-category/project-category.module';
import { ContactusDetailsModule } from './contactus-details/contactus-details.module';
import { CommentDetailsModule } from './comment-details/comment-details.module';
import { ProjectFeaturesModule } from './project-features/project-features.module';
import { ProjectImageModule } from './project-image/project-image.module';
import { ServiceImageModule } from './service-image/service-image.module';
import { ServiceFeaturesModule } from './service-features/service-features.module';

@Module({
  imports: [AdminModule, SocialMediaModule, ServiceDetailsModule, MemberDetailModule, RatingDetailsModule, EventDetailsModule, UserDetailsModule, ProjectDetailsModule, ProjectCategoryModule, ContactusDetailsModule, CommentDetailsModule, ProjectFeaturesModule, ProjectImageModule, ServiceImageModule, ServiceFeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
