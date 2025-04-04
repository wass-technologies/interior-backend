import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailSubscribersModule } from './email-subscribers/email-subscribers.module';
import { CategoryModule } from './category/category.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentDetailsModule } from './comment/comment-details.module';
import { ContactusDetail } from './contactus/entities/contactus-detail.entity';
import { ContactusDetailsModule } from './contactus/contactus-details.module';
import { MemberModule } from './member/member.module';
import { EventDetailsModule } from './events/event-details.module';



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
    synchronize:false,
  }),
  CacheModule.register({
    isGlobal: true,
  }),
    AdminModule, BlogsModule, EmailSubscribersModule, CategoryModule, ProjectsModule, ServicesModule, FeedbackModule, AuthModule, SettingsModule,CommentDetailsModule,ContactusDetailsModule,MemberModule,EventDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
