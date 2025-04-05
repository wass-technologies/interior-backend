import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}
  @Post()
  create(@Body() dto: CreateSubscriberDto) {
    return this.subscriberService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() dto: CommonPaginationDto) {
    return this.subscriberService.findAll(dto);
  }
}
