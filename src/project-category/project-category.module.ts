import { Module } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';
import { ProjectCategoryController } from './project-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from './entities/project-category.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectCategory,Admin])],
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService],
})
export class ProjectCategoryModule {}
