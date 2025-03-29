import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { CreateServiceDetailDto, PaginationDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';

@Controller('service-details')
export class ServiceDetailsController {
  constructor(private readonly serviceDetailsService: ServiceDetailsService) {}

  @Post()
  create(@Body() dto: CreateServiceDetailDto) {
    return this.serviceDetailsService.create(dto);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.serviceDetailsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDetailDto) {
    return this.serviceDetailsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDetailsService.remove(id);
  }
}
