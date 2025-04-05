import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { SettingsModule } from './settings/settings.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { ContactusModule } from './contactus/contactus.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { EventModule } from './event/event.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MemberModule } from './member/member.module';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    synchronize:true,
  }),

    AccountModule, SettingsModule, BlogModule, AuthModule, CommentModule, CategoryModule, ContactusModule, SubscriberModule, EventModule, FeedbackModule, MemberModule, ProjectModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
