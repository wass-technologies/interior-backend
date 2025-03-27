import { Injectable } from '@nestjs/common';
import { CreateProjectFeatureDto } from './dto/create-project-feature.dto';
import { UpdateProjectFeatureDto } from './dto/update-project-feature.dto';

@Injectable()
export class ProjectFeaturesService {
  create(createProjectFeatureDto: CreateProjectFeatureDto) {
    return 'This action adds a new projectFeature';
  }

  findAll() {
    return `This action returns all projectFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectFeature`;
  }

  update(id: number, updateProjectFeatureDto: UpdateProjectFeatureDto) {
    return `This action updates a #${id} projectFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectFeature`;
  }
}
