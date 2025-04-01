import { Module } from '@nestjs/common';
import { EventDetailsService } from './event-details.service';
import { EventDetailsController } from './event-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDetail } from './entities/event-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EventDetail,Admin])],
  controllers: [EventDetailsController],
  providers: [EventDetailsService],
})
export class EventDetailsModule {}
