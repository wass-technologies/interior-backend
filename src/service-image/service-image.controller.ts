import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceImageService } from './service-image.service';
import { CreateServiceImageDto } from './dto/create-service-image.dto';
import { UpdateServiceImageDto } from './dto/update-service-image.dto';

@Controller('service-image')
export class ServiceImageController {
  constructor(private readonly serviceImageService: ServiceImageService) {}

  @Post()
  create(@Body() createServiceImageDto: CreateServiceImageDto) {
    return this.serviceImageService.create(createServiceImageDto);
  }

  @Get()
  findAll() {
    return this.serviceImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceImageDto: UpdateServiceImageDto) {
    return this.serviceImageService.update(+id, updateServiceImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceImageService.remove(+id);
  }
}
