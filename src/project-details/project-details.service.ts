import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDetailDto, PaginationDto } from './dto/create-project-detail.dto';
import { UpdateProjectDetailDto } from './dto/update-project-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDetail } from './entities/project-detail.entity';
import { ProjectCategory } from 'src/project-category/entities/project-category.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Brackets, Repository } from 'typeorm';


@Injectable()
export class ProjectDetailsService {
  constructor(
    @InjectRepository(ProjectDetail)
    private readonly repo: Repository<ProjectDetail>,

    @InjectRepository(ProjectCategory)
    private readonly categoryRepo: Repository<ProjectCategory>,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
) {}
  async create(dto: CreateProjectDetailDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category not found..!');

    const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
    if (!admin) throw new NotFoundException('Admin not found..!');

    const obj = this.repo.create({
      name: dto.name,
      description: dto.description,
      category,
      admin
  });
    return await this.repo.save(obj);
  }

  async findAll(dto:PaginationDto) {
    const keyword = dto.keyword || '';
    const categories = dto.category || [];

    const query =this.repo
    .createQueryBuilder('project_detail')
    .leftJoinAndSelect('project_detail.category','project_category')
    .leftJoinAndSelect('project_detail.admin', 'admin')
    .leftJoinAndSelect('project_detail.image', 'project_image')
    .leftJoinAndSelect('project_detail.features', 'project_feature')
    .select([
      'project_detail.id',
      'project_detail.name',
      'project_detail.description',
      'project_category.id',
      'project_category.name',
      'admin.id',
      'admin.name',
      'project_image.fileName',
      'project_feature.name',
      'project_feature.details'
    ])
    .orderBy('project_detail.name', 'ASC')
    if (categories) {
      query.andWhere('project_category.id IN (:categories)', { categories });
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
    const[result,total] = await query.take(dto.limit).skip(dto.offset).getManyAndCount();

    return {result,total};
  }

  findOne(id: number) {
    return `This action returns a #${id} projectDetail`;
  }

  update(id: number, updateProjectDetailDto: UpdateProjectDetailDto) {
    return `This action updates a #${id} projectDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectDetail`;
  }
}
