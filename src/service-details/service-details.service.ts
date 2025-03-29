import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDetailDto, PaginationDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { ServiceDetail } from './entities/service-detail.entity';

@Injectable()
export class ServiceDetailsService {
constructor(     @InjectRepository(ServiceDetail)
     private readonly repo: Repository<ServiceDetail>,
     @InjectRepository(Admin)
     private readonly adminRepo: Repository<Admin> ){}
  async create(dto: CreateServiceDetailDto) {
   const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
    if (!admin) {
      throw new NotFoundException('Admin not found..!');
    }
    const obj = this.repo.create({
      name:dto.name,
      description:dto.description,
      admin
    });
    return await this.repo.save(obj);
  }

  async findAll(dto:PaginationDto) {
    const keyword = dto.keyword || '';
    const query = this.repo
    .createQueryBuilder('service_detail')
    .leftJoinAndSelect('service_detail.features', 'service_feature')
    .leftJoinAndSelect('service_detail.image', 'service_image')
    .select([
      'service_detail.id',
      'service_detail.name',
      'service_detail.description',
      'service_feature.id',
      'service_feature.name',
      'service_feature.details',
      'service_image.file',
      'service_image.fileName'
    ])
    .orderBy('service_detail.name', 'ASC')
    if (keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('project_detail.name LIKE :name', {
            name: '%' + keyword + '%',
          });
        }),
      );
    }
    const[result,total] = await query.take(dto.limit).skip(dto.offset).getManyAndCount();

    return {result,total};
  }

  async findOne(id: string) {
    const service = await this.repo.findOne({
      where: { id },
      relations: ['feature', 'admin', 'image' ],
    });
  
    if (!service) {
      throw new NotFoundException('Service not found..!');
    }
    return service;
  }

  async update(id: string, dto: UpdateServiceDetailDto) {
    const service = await this.repo.findOne({where:{id:id}});
    if (!service) {
      throw new NotFoundException(`service not found`);
    }
    const obj = Object.assign(service,dto);
    return await this.repo.save(obj);
  }
  async remove(id:string) {
    const service = await this.repo.findOne({where:{id:id}});
    if (!service) {
      throw new NotFoundException('service not found');
    }
    return await this.repo.remove(service);;
  }
}
