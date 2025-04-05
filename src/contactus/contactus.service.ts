import { Injectable } from '@nestjs/common';
import { CreateContactusDto } from './dto/create-contactus.dto';
import { UpdateContactusDto } from './dto/update-contactus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contactus } from './entities/contactus.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class ContactusService {
  constructor(
    @InjectRepository(Contactus) private readonly repo: Repository<Contactus>

  ){}
  async create(dto: CreateContactusDto) {
    const obj = this.repo.create(dto);
    return this.repo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    
    const [result, count] = await this.repo
      .createQueryBuilder('contactus')
      .select([
        'contactus.id',
        'contactus.name',
        'contactus.emailId',
        'contactus.phoneNumber',
        'contactus.message',
        'contactus.createdAt',
      ])
      .orderBy('contactus.createdAt', 'DESC')
      .skip(dto.offset)
      .getManyAndCount();
  
    return { result, count };
  }
  
}
