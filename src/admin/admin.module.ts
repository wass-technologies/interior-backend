import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Service } from 'src/services/entities/service.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Member } from 'src/member/entities/member.entity';
import { Setting } from 'src/settings/entities/setting.entity';
import { EmailSubscriber } from 'src/email-subscribers/entities/email-subscriber.entity';
import { EventDetail } from 'src/events/entities/event-detail.entity';
import { ContactusDetail } from 'src/contactus/entities/contactus-detail.entity';
import { CommentDetail } from 'src/comment/entities/comment-detail.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports:[    TypeOrmModule.forFeature([  Admin,
    Project,
    Service,
    Blog,
    Feedback,
    Member,
    Setting,
    EmailSubscriber,
    EventDetail,
    ContactusDetail,
    CommentDetail,
  Category]),
],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
