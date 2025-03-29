import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectFeaturesService } from './project-features.service';
import { CreateProjectFeatureDto, PaginationDto } from './dto/create-project-feature.dto';
import { UpdateProjectFeatureDto } from './dto/update-project-feature.dto';

@Controller('project-features')
export class ProjectFeaturesController {
  constructor(private readonly projectFeaturesService: ProjectFeaturesService) {}

  @Post()
  create(@Body() dto: CreateProjectFeatureDto) {
    return this.projectFeaturesService.create(dto);
  }

  @Get()
  findAll(@Query() dto:PaginationDto) {
    return this.projectFeaturesService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectFeatureDto) {
    return this.projectFeaturesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectFeaturesService.remove(id);
  }
}
