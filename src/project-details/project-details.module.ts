import { Module } from '@nestjs/common';
import { ProjectDetailsService } from './project-details.service';
import { ProjectDetailsController } from './project-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategory } from 'src/project-category/entities/project-category.entity';
import { ProjectDetail } from './entities/project-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectCategory,ProjectDetail,Admin])],
  controllers: [ProjectDetailsController],
  providers: [ProjectDetailsService],
})
export class ProjectDetailsModule {}
