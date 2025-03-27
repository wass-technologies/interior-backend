import { Injectable } from '@nestjs/common';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';

@Injectable()
export class ProjectImageService {
  create(createProjectImageDto: CreateProjectImageDto) {
    return 'This action adds a new projectImage';
  }

  findAll() {
    return `This action returns all projectImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectImage`;
  }

  update(id: number, updateProjectImageDto: UpdateProjectImageDto) {
    return `This action updates a #${id} projectImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectImage`;
  }
}
