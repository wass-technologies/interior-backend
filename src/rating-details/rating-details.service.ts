import { Injectable } from '@nestjs/common';
import { CreateRatingDetailDto } from './dto/create-rating-detail.dto';
import { UpdateRatingDetailDto } from './dto/update-rating-detail.dto';

@Injectable()
export class RatingDetailsService {
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
