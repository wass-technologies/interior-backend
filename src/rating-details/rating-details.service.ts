import { Injectable } from '@nestjs/common';
import { CreateRatingDetailDto } from './dto/create-rating-detail.dto';
import { UpdateRatingDetailDto } from './dto/update-rating-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingDetail } from './entities/rating-detail.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class RatingDetailsService {
  constructor(
    @InjectRepository(RatingDetail) private readonly repo:Repository<RatingDetail>,
    @InjectRepository(Admin) private readonly adminRepo:Repository<Admin>
  ){}
  create(createRatingDetailDto: CreateRatingDetailDto) {
    return 'This action adds a new ratingDetail';
  }

  findAll() {
    return `This action returns all ratingDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ratingDetail`;
  }

  update(id: number, updateRatingDetailDto: UpdateRatingDetailDto) {
    return `This action updates a #${id} ratingDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ratingDetail`;
  }
}
