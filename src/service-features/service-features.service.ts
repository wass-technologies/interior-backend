import { Injectable } from '@nestjs/common';
import { CreateServiceFeatureDto } from './dto/create-service-feature.dto';
import { UpdateServiceFeatureDto } from './dto/update-service-feature.dto';

@Injectable()
export class ServiceFeaturesService {
  create(createServiceFeatureDto: CreateServiceFeatureDto) {
    return 'This action adds a new serviceFeature';
  }

  findAll() {
    return `This action returns all serviceFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceFeature`;
  }

  update(id: number, updateServiceFeatureDto: UpdateServiceFeatureDto) {
    return `This action updates a #${id} serviceFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceFeature`;
  }
}
