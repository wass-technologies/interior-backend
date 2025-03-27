import { Module } from '@nestjs/common';
import { RatingDetailsService } from './rating-details.service';
import { RatingDetailsController } from './rating-details.controller';

@Module({
  controllers: [RatingDetailsController],
  providers: [RatingDetailsService],
})
export class RatingDetailsModule {}
