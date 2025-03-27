import { Module } from '@nestjs/common';
import { ProjectImageService } from './project-image.service';
import { ProjectImageController } from './project-image.controller';

@Module({
  controllers: [ProjectImageController],
  providers: [ProjectImageService],
})
export class ProjectImageModule {}
