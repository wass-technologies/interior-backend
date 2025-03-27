import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectFeaturesService } from './project-features.service';
import { CreateProjectFeatureDto } from './dto/create-project-feature.dto';
import { UpdateProjectFeatureDto } from './dto/update-project-feature.dto';

@Controller('project-features')
export class ProjectFeaturesController {
  constructor(private readonly projectFeaturesService: ProjectFeaturesService) {}

  @Post()
  create(@Body() createProjectFeatureDto: CreateProjectFeatureDto) {
    return this.projectFeaturesService.create(createProjectFeatureDto);
  }

  @Get()
  findAll() {
    return this.projectFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectFeatureDto: UpdateProjectFeatureDto) {
    return this.projectFeaturesService.update(+id, updateProjectFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectFeaturesService.remove(+id);
  }
}
