import { Module } from '@nestjs/common';
import { ContactusDetailsService } from './contactus-details.service';
import { ContactusDetailsController } from './contactus-details.controller';

@Module({
  controllers: [ContactusDetailsController],
  providers: [ContactusDetailsService],
})
export class ContactusDetailsModule {}
