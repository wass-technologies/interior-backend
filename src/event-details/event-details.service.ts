import { Injectable } from '@nestjs/common';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
import { UpdateEventDetailDto } from './dto/update-event-detail.dto';

@Injectable()
export class EventDetailsService {
  create(createEventDetailDto: CreateEventDetailDto) {
    return 'This action adds a new eventDetail';
  }

  findAll() {
    return `This action returns all eventDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventDetail`;
  }

  update(id: number, updateEventDetailDto: UpdateEventDetailDto) {
    return `This action updates a #${id} eventDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventDetail`;
  }
}
