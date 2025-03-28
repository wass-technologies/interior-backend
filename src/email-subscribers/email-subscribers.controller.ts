import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmailSubscribersService } from './email-subscribers.service';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { UpdateEmailSubscriberDto } from './dto/update-email-subscriber.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('email-subscribers')
export class EmailSubscribersController {
  constructor(private readonly emailSubscribersService: EmailSubscribersService) {}

  @Post()
  create(@Body() dto: CreateEmailSubscriberDto) {
    return this.emailSubscribersService.create(dto);
  }

  @Get()
  findAll(@Query() dto: CommonPaginationDto) {
    return this.emailSubscribersService.findAll(dto);
  }
}
