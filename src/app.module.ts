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
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailSubscribersModule } from './email-subscribers/email-subscribers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads directory
      serveRoot: '/uploads', // The URL path to access the files
    }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    AdminModule, SocialMediaModule, ServiceDetailsModule, MemberDetailModule, RatingDetailsModule, EventDetailsModule, UserDetailsModule, ProjectDetailsModule, ProjectCategoryModule, ContactusDetailsModule, CommentDetailsModule, ProjectFeaturesModule, ProjectImageModule, ServiceImageModule, ServiceFeaturesModule, BlogsModule, EmailSubscribersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
