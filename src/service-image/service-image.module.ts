import { Module } from '@nestjs/common';
import { ServiceImageService } from './service-image.service';
import { ServiceImageController } from './service-image.controller';

@Module({
  controllers: [ServiceImageController],
  providers: [ServiceImageService],
})
export class ServiceImageModule {}
