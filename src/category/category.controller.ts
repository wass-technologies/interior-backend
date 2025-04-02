import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateCategoryDto, @CurrentUser()user:Admin) {
    return this.categoryService.create(dto,user);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
