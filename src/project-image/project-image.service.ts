import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { UpdateProjectImageDto } from './dto/update-project-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectImage } from './entities/project-image.entity';
import { Repository } from 'typeorm';
import { ProjectDetail } from 'src/project-details/entities/project-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class ProjectImageService {
  constructor(
    @InjectRepository(ProjectImage)
    private readonly repo: Repository<ProjectImage>,
    @InjectRepository(ProjectDetail)
    private readonly projectDetailRepo: Repository<ProjectDetail>,
  ) {}
  async create(projectId:string, image: string) {
    const project = await this.projectDetailRepo.findOne({ where: { id: projectId }, relations: ['admin'] });
    if (!project){
      throw new NotFoundException('Project not found');
    }
    const obj = this.repo.create({
      file: process.env.BASE_URL + image,
      fileName: image,
      project,
      admin:project.admin,
    });
    return this.repo.save(obj);
  }

  findAll() {
    return `This action returns all projectImage`;
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return result;
  }

  async updateImage(image: string, result: ProjectImage) {
    const obj = Object.assign(result, {
      file: process.env.BASE_URL + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }


  async remove(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Media not found!');
    }
    return this.repo.remove(result);
  }
}
