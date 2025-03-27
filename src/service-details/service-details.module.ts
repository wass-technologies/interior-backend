import { Module } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetailsController } from './service-details.controller';

@Module({
  controllers: [ServiceDetailsController],
  providers: [ServiceDetailsService],
})
export class ServiceDetailsModule {}
