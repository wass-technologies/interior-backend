import { Module } from '@nestjs/common';
import { ProjectFeaturesService } from './project-features.service';
import { ProjectFeaturesController } from './project-features.controller';

@Module({
  controllers: [ProjectFeaturesController],
  providers: [ProjectFeaturesService],
})
export class ProjectFeaturesModule {}
