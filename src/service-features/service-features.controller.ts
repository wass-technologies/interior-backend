import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceFeaturesService } from './service-features.service';
import { CreateServiceFeatureDto, PaginationDto } from './dto/create-service-feature.dto';
import { UpdateServiceFeatureDto } from './dto/update-service-feature.dto';

@Controller('service-features')
export class ServiceFeaturesController {
  constructor(private readonly serviceFeaturesService: ServiceFeaturesService) {}

  @Post()
   create(@Body() dto:CreateServiceFeatureDto) {
     return this.serviceFeaturesService.create(dto);
   }
 
   @Get()
   findAll(@Query() dto:PaginationDto) {
     return this.serviceFeaturesService.findAll(dto);
   }
 
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.serviceFeaturesService.findOne(+id);
   }
 
   @Patch(':id')
   update(@Param('id') id: string, @Body() dto: UpdateServiceFeatureDto) {
     return this.serviceFeaturesService.update(id, dto);
   }
 
   @Delete(':id')
   remove(@Param('id') id: string) {
     return this.serviceFeaturesService.remove(id);
   }
}
