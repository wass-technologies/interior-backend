import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectCategoryDto } from './dto/create-project-category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectCategory } from './entities/project-category.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class ProjectCategoryService {
  constructor(
    @InjectRepository(ProjectCategory)
    private readonly repo: Repository<ProjectCategory>,
    @InjectRepository(Admin) private readonly adminrepo: Repository<Admin>,
) {}
 async create(dto: CreateProjectCategoryDto) {
    const existCate= await this.repo.findOne({where:{name:dto.name}});
    if(existCate){
      throw new ConflictException('Alredy Exist, try to add different One')
    }
    const admin = await this.adminrepo.findOne({where:{id:dto.adminId}});
    if(!admin){
      throw new NotFoundException('Admin not found!')
    }

    const obj = this.repo.create({...dto,admin})
    return this.repo.save(obj);
  }

  async findAll(dto:CommonPaginationDto) {

    const keyword = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('project_category');
    if(keyword){
      queryBuilder.andWhere(
        '(project-category.name LIKE :keyword)',
        {keyword: `%${keyword}%`}
      );
    }
    queryBuilder.take(dto.limit).skip(dto.offset);

    const [reasult,count]=await queryBuilder.getManyAndCount();
    return {reasult,count};
  }

  async remove(id: number) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Not found!');
    }
    return this.repo.remove(result);
  }
}
