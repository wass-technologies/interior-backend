import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { ServiceFeature } from './entities/service-feature.entity';
import { ServiceDetail } from 'src/service-details/entities/service-detail.entity';
import { CreateServiceFeatureDto, PaginationDto } from './dto/create-service-feature.dto';
import { UpdateServiceFeatureDto } from './dto/update-service-feature.dto';

@Injectable()
export class ServiceFeaturesService {
constructor(
    @InjectRepository(ServiceFeature)private readonly repo: Repository<ServiceFeature>,
    @InjectRepository(ServiceDetail)
    private readonly ServiceDetailRepo: Repository<ServiceDetail>,
  ){}
  async create(dto: CreateServiceFeatureDto) {
    const service = await this.ServiceDetailRepo.findOne({ where: { id: dto.serviceId }, relations: ['admin'] });
    if (!service) {
      throw new NotFoundException('Project not found');
    }
    const obj = this.repo.create({
      name:dto.name,
      details:dto.details,
      service,
      admin:service.admin
    }) 

    return this.repo.save(obj);
  }

  async findAll(dto:PaginationDto) {
    const keyword=dto.keyword || '';
    const service = JSON.parse(dto.service);

    const query = this.repo
    .createQueryBuilder('service_feature')
    .leftJoinAndSelect('service_feature.project', 'service_detail')
    .leftJoinAndSelect('service_feature.admin', 'admin')
    .select([
      'service_feature.id',
      'service_feature.name',
      'service_detail.id',
      'service_detail.name',
      'admin.id',
      'admin.name',
    ])
    .orderBy('service_detail.name', 'ASC')
    if (service.length > 0) {
      query.andWhere('service_detail.name LIKE :service', { project: `%${service}%` });
    }
    if (keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('service_detail.name LIKE :name', {
            name: '%' + keyword + '%',
          });
        }),
      );
    }

    const [result, total] = await query
    .skip(dto.offset)
    .take(dto.limit)
    .orderBy({'service_detail.name': 'ASC'})
    .getManyAndCount();
    return {result,total};
  }

  findOne(id: number) {
    return `This action returns a #${id} ServiceFeature`;
  }

  async update(id: string, dto: UpdateServiceFeatureDto) {
    const feature = await this.repo.findOne({where:{id:id}});
    if(!feature){
      throw new NotFoundException('feature not found');
    }
    const obj=Object.assign(feature,dto);

    return this.repo.save(obj);
  }

  async remove(id: string) {
    const feature = await this.repo.findOne({where:{id:id}});
    if(!feature){
      throw new NotFoundException('feature not found');
    }
    return this.repo.remove(feature);
  }
}
