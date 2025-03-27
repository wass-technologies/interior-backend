import { Module } from '@nestjs/common';
import { CommentDetailsService } from './comment-details.service';
import { CommentDetailsController } from './comment-details.controller';

@Module({
  controllers: [CommentDetailsController],
  providers: [CommentDetailsService],
})
export class CommentDetailsModule {}
