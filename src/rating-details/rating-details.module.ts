import { Module } from '@nestjs/common';
import { RatingDetailsService } from './rating-details.service';
import { RatingDetailsController } from './rating-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingDetail } from './entities/rating-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RatingDetail,Admin,UserDetail])],
  controllers: [RatingDetailsController],
  providers: [RatingDetailsService],
})
export class RatingDetailsModule {}
