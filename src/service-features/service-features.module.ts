import { Module } from '@nestjs/common';
import { ServiceFeaturesService } from './service-features.service';
import { ServiceFeaturesController } from './service-features.controller';

@Module({
  controllers: [ServiceFeaturesController],
  providers: [ServiceFeaturesService],
})
export class ServiceFeaturesModule {}
