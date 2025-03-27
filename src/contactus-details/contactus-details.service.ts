import { Injectable } from '@nestjs/common';
import { CreateContactusDetailDto } from './dto/create-contactus-detail.dto';
import { UpdateContactusDetailDto } from './dto/update-contactus-detail.dto';

@Injectable()
export class ContactusDetailsService {
  create(createContactusDetailDto: CreateContactusDetailDto) {
    return 'This action adds a new contactusDetail';
  }

  findAll() {
    return `This action returns all contactusDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactusDetail`;
  }

  update(id: number, updateContactusDetailDto: UpdateContactusDetailDto) {
    return `This action updates a #${id} contactusDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactusDetail`;
  }
}
