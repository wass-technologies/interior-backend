import { Injectable } from '@nestjs/common';
import { CreateContactusDetailDto } from './dto/create-contactus-detail.dto';
import { UpdateContactusDetailDto } from './dto/update-contactus-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactusDetail } from './entities/contactus-detail.entity';
import { Like, Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class ContactusDetailsService {
  constructor(
    @InjectRepository(ContactusDetail) private readonly repo: Repository<ContactusDetail>

  ){}
  async create(dto: CreateContactusDetailDto) {
    const obj = Object.create(dto);
    return this.repo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const [result, count] = await this.repo.findAndCount({
      take: dto.limit,
      skip: dto.offset,
      where: {
        name: Like('%' + keyword + '%'),
        query: Like('%' + keyword + '%'),
        phoneNumber: Like('%' + keyword + '%'),
        message: Like('%' + keyword + '%'),
      },
    });
    return {result, count};
  }
}
