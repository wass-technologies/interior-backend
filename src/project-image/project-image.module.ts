import { Module } from '@nestjs/common';
import { ProjectImageService } from './project-image.service';
import { ProjectImageController } from './project-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImage } from './entities/project-image.entity';
import { ProjectDetail } from 'src/project-details/entities/project-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectImage,ProjectDetail])],
  controllers: [ProjectImageController],
  providers: [ProjectImageService],
})
export class ProjectImageModule {}
