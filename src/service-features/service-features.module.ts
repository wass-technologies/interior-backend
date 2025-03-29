import { Module } from '@nestjs/common';
import { ServiceFeaturesService } from './service-features.service';
import { ServiceFeaturesController } from './service-features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceFeature } from './entities/service-feature.entity';
import { ServiceDetail } from 'src/service-details/entities/service-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceFeature,ServiceDetail])],
  controllers: [ServiceFeaturesController],
  providers: [ServiceFeaturesService],
})
export class ServiceFeaturesModule {

}
