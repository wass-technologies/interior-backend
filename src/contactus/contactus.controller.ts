import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ContactusService } from './contactus.service';
import { CreateContactusDto } from './dto/create-contactus.dto';
import { UpdateContactusDto } from './dto/update-contactus.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('contactus')
export class ContactusController {
  constructor(private readonly contactusService: ContactusService) {}

  @Post()
  create(@Body() dto: CreateContactusDto) {
    return this.contactusService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() dto: CommonPaginationDto) {
    return this.contactusService.findAll(dto);
  }
}
