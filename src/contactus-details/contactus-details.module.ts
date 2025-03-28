import { Module } from '@nestjs/common';
import { ContactusDetailsService } from './contactus-details.service';
import { ContactusDetailsController } from './contactus-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactusDetail } from './entities/contactus-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ContactusDetail])],
  controllers: [ContactusDetailsController],
  providers: [ContactusDetailsService],
})
export class ContactusDetailsModule {}
