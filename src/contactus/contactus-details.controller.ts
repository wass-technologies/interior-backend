import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactusDetailsService } from './contactus-details.service';
import { CreateContactusDetailDto } from './dto/create-contactus-detail.dto';
import { UpdateContactusDetailDto } from './dto/update-contactus-detail.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('contactus')
export class ContactusDetailsController {
  constructor(private readonly contactusDetailsService: ContactusDetailsService) {}
  @Post()
  create(@Body() dto: CreateContactusDetailDto) {
    return this.contactusDetailsService.create(dto);
  }

  @Get()
  findAll(@Query() dto: CommonPaginationDto) {
    return this.contactusDetailsService.findAll(dto);
  }
}
