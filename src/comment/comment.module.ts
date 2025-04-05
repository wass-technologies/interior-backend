import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment,Blog])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
