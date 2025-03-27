import { Injectable } from '@nestjs/common';
import { CreateServiceImageDto } from './dto/create-service-image.dto';
import { UpdateServiceImageDto } from './dto/update-service-image.dto';

@Injectable()
export class ServiceImageService {
  create(createServiceImageDto: CreateServiceImageDto) {
    return 'This action adds a new serviceImage';
  }

  findAll() {
    return `This action returns all serviceImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceImage`;
  }

  update(id: number, updateServiceImageDto: UpdateServiceImageDto) {
    return `This action updates a #${id} serviceImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceImage`;
  }
}
