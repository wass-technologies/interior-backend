import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectDetailsService } from './project-details.service';
import { CreateProjectDetailDto, PaginationDto } from './dto/create-project-detail.dto';
import { UpdateProjectDetailDto } from './dto/update-project-detail.dto';


@Controller('project-details')
export class ProjectDetailsController {
  constructor(private readonly projectDetailsService: ProjectDetailsService) {}

  @Post()
  create(@Body() createProjectDetailDto: CreateProjectDetailDto) {
    return this.projectDetailsService.create(createProjectDetailDto);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.projectDetailsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDetailDto: UpdateProjectDetailDto) {
    return this.projectDetailsService.update(+id, updateProjectDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectDetailsService.remove(+id);
  }
}
