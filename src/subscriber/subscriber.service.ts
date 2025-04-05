import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber) private readonly repo:Repository<Subscriber>
  ){}
  
  async create(dto: CreateSubscriberDto) {
    const obj = Object.create(dto);
    await this.repo.save(obj);
    return { message: 'Subscribed Succesfully' };
  }

  async findAll(dto: CommonPaginationDto) {
    const [result, count] = await this.repo.findAndCount({
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, count };
  }
}
