import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectFeatureDto, PaginationDto } from './dto/create-project-feature.dto';
import { UpdateProjectFeatureDto } from './dto/update-project-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectFeature } from './entities/project-feature.entity';
import { Brackets, Repository } from 'typeorm';
import { ProjectDetail } from 'src/project-details/entities/project-detail.entity';

@Injectable()
export class ProjectFeaturesService {
  constructor(
    @InjectRepository(ProjectFeature)private readonly repo: Repository<ProjectFeature>,
    @InjectRepository(ProjectDetail)
    private readonly projectDetailRepo: Repository<ProjectDetail>,
  ){}
  async create(dto: CreateProjectFeatureDto) {
    const project = await this.projectDetailRepo.findOne({ where: { id: dto.projectId }, relations: ['admin'] });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const obj = this.repo.create({
      name:dto.name,
      details:dto.details,
      project,
      admin:project.admin
    }) 

    return this.repo.save(obj);
  }

  async findAll(dto:PaginationDto) {
    const keyword=dto.keyword || '';
    const project = JSON.parse(dto.project);

    const query = this.repo
    .createQueryBuilder('project_feature')
    .leftJoinAndSelect('project_feature.project', 'project_detail')
    .leftJoinAndSelect('project_feature.admin', 'admin')
    .select([
      'project_feature.id',
      'project_feature.name',
      'project_detail.id',
      'project_detail.name',
      'admin.id',
      'admin.name',
    ])
    .orderBy('project_detail.name', 'ASC')
    if (project.length > 0) {
      query.andWhere('project_detail.name LIKE :project', { project: `%${project}%` });
    }
    if (keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('project_detail.name LIKE :name', {
            name: '%' + keyword + '%',
          });
        }),
      );
    }

    const [result, total] = await query
    .skip(dto.offset)
    .take(dto.limit)
    .orderBy({'project_detail.name': 'ASC'})
    .getManyAndCount();
    return {result,total};
  }

  async findOne(id: string) {
    const feature = await this.repo.findOne({where:{id:id}});
    if(!feature){
      throw new NotFoundException('feature not found');
    }
    return feature
  }

  async update(id: string, dto: UpdateProjectFeatureDto) {
    const feature = await this.repo.findOne({where:{id:id}});
    if(!feature){
      throw new NotFoundException('feature not found');
    }
    const obj=Object.assign(feature,dto);

    return this.repo.save(obj);
  }

  async remove(id: string) {
    const feature = await this.repo.findOne({where:{id:id}});
    if(!feature){
      throw new NotFoundException('feature not found');
    }
    return this.repo.remove(feature);
  }
}
