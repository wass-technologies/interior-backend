import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  create(@Body() dto: CreateProjectCategoryDto) {
    return this.projectCategoryService.create(dto);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.projectCategoryService.findAll(dto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectCategoryService.remove(id);
  }
}
