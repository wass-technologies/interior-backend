import { Module } from '@nestjs/common';
import { ServiceImageService } from './service-image.service';
import { ServiceImageController } from './service-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { ServiceDetail } from 'src/service-details/entities/service-detail.entity';
import { ServiceImage } from './entities/service-image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,ServiceDetail,ServiceImage])],
  controllers: [ServiceImageController],
  providers: [ServiceImageService],
})
export class ServiceImageModule {}
