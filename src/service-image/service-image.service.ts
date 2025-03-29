import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceImageDto } from './dto/create-service-image.dto';
import { UpdateServiceImageDto } from './dto/update-service-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceImage } from './entities/service-image.entity';
import { ServiceDetail } from 'src/service-details/entities/service-detail.entity';

@Injectable()
export class ServiceImageService {
  constructor(
      @InjectRepository(ServiceImage)
    private readonly repo: Repository<ServiceImage>,
    @InjectRepository(ServiceDetail)
    private readonly serviceDetailRepo: Repository<ServiceDetail>,
  ) {}
  async create(serviceId:string, image: string) {
    const service= await this.serviceDetailRepo.findOne({ where: { id: serviceId }, relations: ['admin'] });
    if (!service){
      throw new NotFoundException('service not found');
    }
    const obj = this.repo.create({
      file: process.env.BASE_URL + image,
      fileName: image,
      service,
      admin:service.admin,
    });
    return this.repo.save(obj);
  }

  findAll() {
    return `This action returns all serviceImage`;
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return result;
  }
  async updateImage(image: string, result: ServiceImage) {
    const obj = Object.assign(result, {
      file: process.env.BASE_URL + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }
  async remove(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return this.repo.remove(result);
  }
}
