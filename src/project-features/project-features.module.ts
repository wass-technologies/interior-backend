import { Module } from '@nestjs/common';
import { ProjectFeaturesService } from './project-features.service';
import { ProjectFeaturesController } from './project-features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectFeature } from './entities/project-feature.entity';
import { ProjectDetail } from 'src/project-details/entities/project-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectFeature,ProjectDetail])],
  controllers: [ProjectFeaturesController],
  providers: [ProjectFeaturesService],
})
export class ProjectFeaturesModule {}
