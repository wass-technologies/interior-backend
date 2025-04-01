import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
import { UpdateEventDetailDto } from './dto/update-event-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDetail } from './entities/event-detail.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class EventDetailsService {
  constructor(
    @InjectRepository(EventDetail) private readonly eventRepo: Repository<EventDetail>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
   
  ) {}
  async create(dto:CreateEventDetailDto){
    const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
    if (!admin) {
        throw new NotFoundException('Admin not found');
    }
    const event = await this.eventRepo.findOne({where:{title:dto.title}});
    if(event){
      throw new ConflictException('Event alredy exist');
    }
    const obj = this.eventRepo.create({...dto,admin});
    return this.eventRepo.save(obj);
 
  }
  async findAll(dto:CommonPaginationDto){
    const keyword = dto.keyword || '';
    const queryBuilder = this.eventRepo.createQueryBuilder('event_detail');
    if(keyword){
      queryBuilder.andWhere(
        '(event_detail.title Like :keyword OR event_detail.month Like :keyword OR event_detail.decription LIKE :keyword)',
        {keyword:`%${keyword}%`}
      )
    }
    queryBuilder.take(dto.limit).skip(dto.offset);
    const [result, count]= await queryBuilder.getManyAndCount();
    return {result,count}
    
  }

  async findOne(id:string){
    const result = await this.eventRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Event not found...!');
    }
    return result;
  }

  async update(id:string, dto:UpdateEventDetailDto){
    const result = await this.eventRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Event not found...!');
    }
    const obj =Object.assign(result,dto);
    return this.eventRepo.save(obj);
  }

  async image(image:string, result:EventDetail){
    const obj = Object.assign(result,{
      image:process.env.BASE_URL + image,
      imagePath:image,
    });
    return this.eventRepo.save(obj);
  }

}
