import { Module } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetailsController } from './service-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { ServiceDetail } from './entities/service-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,ServiceDetail])],
  controllers: [ServiceDetailsController],
  providers: [ServiceDetailsService],
})
export class ServiceDetailsModule {}
