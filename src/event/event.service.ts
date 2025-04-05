import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
   
  ) {}
  async create(dto:CreateEventDto ,userId:string){
    const event = await this.eventRepo.findOne({where:{title:dto.title}});
    if(event){
      throw new ConflictException('Event alredy exist');
    }
    const obj = this.eventRepo.create({...dto,accountId:userId});
    return this.eventRepo.save(obj);
 
  }
  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const queryBuilder = this.eventRepo.createQueryBuilder('event');
    queryBuilder.select([
      'event.id',
      'event.title',
      'event.description',
      'event.eventDate',
      'event.month',
      'event.day',
      'event.image',
      'event.imagePath',
      'event.createdAt',
      'event.updatedAt',
    ]);
    if (keyword) {
      queryBuilder.andWhere(
        '(event.title LIKE :keyword OR event.month LIKE :keyword OR event.description LIKE :keyword)',
        { keyword: `%${keyword}%` }
      );
    }
    queryBuilder.take(dto.limit).skip(dto.offset);
    const [result, count] = await queryBuilder.getManyAndCount();
  
    return { result, count };
  }
  

  async findOne(id:string){
    const result = await this.eventRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Event not found...!');
    }
    return result;
  }

  async update(id:string, dto:UpdateEventDto){
    const result = await this.eventRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Event not found...!');
    }
    const obj =Object.assign(result,dto);
    return this.eventRepo.save(obj);
  }

  async image(image:string, result:Event){
    const obj = Object.assign(result,{
      image:process.env.BASE_URL + image,
      imagePath:image,
    });
    return this.eventRepo.save(obj);
  }
}
