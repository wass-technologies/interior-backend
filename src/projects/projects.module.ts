import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,Category])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
