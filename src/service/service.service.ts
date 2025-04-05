import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto, PaginationDto, StatusDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ServiceStatus } from 'src/enum';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,

  ) {}
  async createService(dto:CreateServiceDto, user:string) {
    const result = await this.repo.findOne({where:{
     name:dto.name
    }});
    if(result){
     throw new ConflictException('Service with this name alredy exist, try another')
    }
    const obj= this.repo.create({...dto,accountId:user})
    return this.repo.save(obj);
   }
 
  async findAll(dto:PaginationDto) {
   const keyword = dto.keyword || '';
   const query = this.repo
   .createQueryBuilder('service')
   .select([
     'service.id',
     'service.name',
     'service.description',
     'service.file',
     'service.fileName',
   ])
   .where('service.status = :status', {
     status: ServiceStatus.ACTIVE,
   });
   query.andWhere(
     new Brackets((qb) => {
       qb.where('service.name LIKE :name', {
         name: '%' + keyword + '%',
       });
     }),
   );
   const [result, total] = await query
   .skip(dto.offset)
   .take(dto.limit)
   .orderBy({ 'service.name': 'ASC' })
   .getManyAndCount();
 return { result, total };
 }
 
  async findService(id: String) {
     const result = await this.repo
       .createQueryBuilder('service')
       .where('service.id = :id', { id: id })
       .getOne();
     if (!result) {
       throw new NotFoundException('service not found!');
     }
     return result;
   }
 
   async update(id: string, dto:CreateServiceDto) {
     const result = await this.repo.findOne({ where: { id } });
     if (!result) {
       throw new NotFoundException('Service not found!');
     }
     const obj = Object.assign(result, dto);
     return this.repo.save(obj);
   }
   async status(id: string, dto:StatusDto) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Service detail not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }
 
   async serviceImage(image: string, result: Service) {
     const obj = Object.assign(result, {
       file: process.env.BASE_URL + image,
       fileName: image,
     });
     return this.repo.save(obj);
   }
 

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
