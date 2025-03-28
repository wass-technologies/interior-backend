import { Module } from '@nestjs/common';
import { EmailSubscribersService } from './email-subscribers.service';
import { EmailSubscribersController } from './email-subscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSubscriber } from './entities/email-subscriber.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmailSubscriber])],
  controllers: [EmailSubscribersController],
  providers: [EmailSubscribersService],
})
export class EmailSubscribersModule {}
