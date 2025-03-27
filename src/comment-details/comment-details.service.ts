import { Injectable } from '@nestjs/common';
import { CreateCommentDetailDto } from './dto/create-comment-detail.dto';
import { UpdateCommentDetailDto } from './dto/update-comment-detail.dto';

@Injectable()
export class CommentDetailsService {
  create(createCommentDetailDto: CreateCommentDetailDto) {
    return 'This action adds a new commentDetail';
  }

  findAll() {
    return `This action returns all commentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentDetail`;
  }

  update(id: number, updateCommentDetailDto: UpdateCommentDetailDto) {
    return `This action updates a #${id} commentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentDetail`;
  }
}
