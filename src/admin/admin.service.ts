import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Service } from 'src/services/entities/service.entity';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ){}

  async getSliderImages() {
    const queryBuilder = this.projectRepository.createQueryBuilder('project');
    
    const sliderImages = await queryBuilder
      .select(['project.file', 'project.fileName'])
      .where('project.file IS NOT NULL')
      .andWhere('project.status = :status', { status: 'ACTIVE' })
      .getMany();

    return sliderImages;
  }

  
  
}