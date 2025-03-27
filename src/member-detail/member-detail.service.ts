import { Injectable } from '@nestjs/common';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';

@Injectable()
export class MemberDetailService {
  create(createMemberDetailDto: CreateMemberDetailDto) {
    return 'This action adds a new memberDetail';
  }

  findAll() {
    return `This action returns all memberDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberDetail`;
  }

  update(id: number, updateMemberDetailDto: UpdateMemberDetailDto) {
    return `This action updates a #${id} memberDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberDetail`;
  }
}
