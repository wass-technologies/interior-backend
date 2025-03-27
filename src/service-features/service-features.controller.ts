import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceFeaturesService } from './service-features.service';
import { CreateServiceFeatureDto } from './dto/create-service-feature.dto';
import { UpdateServiceFeatureDto } from './dto/update-service-feature.dto';

@Controller('service-features')
export class ServiceFeaturesController {
  constructor(private readonly serviceFeaturesService: ServiceFeaturesService) {}

  @Post()
  create(@Body() createServiceFeatureDto: CreateServiceFeatureDto) {
    return this.serviceFeaturesService.create(createServiceFeatureDto);
  }

  @Get()
  findAll() {
    return this.serviceFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceFeatureDto: UpdateServiceFeatureDto) {
    return this.serviceFeaturesService.update(+id, updateServiceFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceFeaturesService.remove(+id);
  }
}
