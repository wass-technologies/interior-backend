import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { CreateServiceDetailDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';

@Controller('service-details')
export class ServiceDetailsController {
  constructor(private readonly serviceDetailsService: ServiceDetailsService) {}

  @Post()
  create(@Body() createServiceDetailDto: CreateServiceDetailDto) {
    return this.serviceDetailsService.create(createServiceDetailDto);
  }

  @Get()
  findAll() {
    return this.serviceDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDetailDto: UpdateServiceDetailDto) {
    return this.serviceDetailsService.update(+id, updateServiceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDetailsService.remove(+id);
  }
}
