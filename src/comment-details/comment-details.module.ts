import { Module } from '@nestjs/common';
import { CommentDetailsService } from './comment-details.service';
import { CommentDetailsController } from './comment-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentDetail } from './entities/comment-detail.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CommentDetail,Blog])],
  controllers: [CommentDetailsController],
  providers: [CommentDetailsService],
})
export class CommentDetailsModule {}
