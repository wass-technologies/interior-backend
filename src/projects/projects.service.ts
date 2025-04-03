import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, PaginationDto, StatusDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Category } from 'src/category/entities/category.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { ProjectStatus } from 'src/enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    @InjectRepository(Category)
    private readonly catrepo: Repository<Category>,
  ) {}
  async createProject(dto: CreateProjectDto, user:Admin) {
   const result = await this.repo.findOne({where:{
    name:dto.name
   }});
   if(result){
    throw new ConflictException('Project with this name alredy exist, try another')
   }
   const category = await this.catrepo.findOne({where:{id:dto.category}})
   if(!category){
    throw new NotFoundException('Category Not Found..!')
   }
   const obj= await this.repo.create({...dto,category,admin:user})
   
   return this.repo.save(obj);
  }

 async findAll(dto:PaginationDto) {
  const category = dto.category || '';
  const keyword = dto.keyword || '';
  const query = this.repo
  .createQueryBuilder('project')
  .leftJoinAndSelect('project.category', 'category')
  .select([
    'project.id',
    'project.name',
    'project.description',
    'project.file',
    'project.fileName',

    'category.id',
    'category.name'
  ])
  .where('project.status = :status', {
    status: ProjectStatus.ACTIVE,
  });
  query.andWhere(
    new Brackets((qb) => {
      qb.where('project.name LIKE :name', {
        name: '%' + keyword + '%',
      });
    }),
  );
  if(category !== null){
  query.andWhere(
    new Brackets((qb) => {
      qb.where('category.name LIKE :name', {
      name: '%' + category + '%',
      });
    }),
  );
}
  const [result, total] = await query
  .skip(dto.offset)
  .take(dto.limit)
  .orderBy({ 'project.name': 'ASC' })
  .getManyAndCount();
return { result, total };

 }

 async getProjectImagesForSlider() {
  const query = this.repo
    .createQueryBuilder('project')
    .select([
      'project.file', 
      'project.fileName'
    ])
    .where('project.status = :status', {
      status: ProjectStatus.ACTIVE,
    });

  const [result,total] = await query.getManyAndCount();
  return {result,total}
}


 async findProject(id: String) {
  console.log(id);
    const result = await this.repo
      .createQueryBuilder('project')
      .where('project.id = :id', { id: id })
      .getOne();
      console.log(result);
    if (!result) {
      throw new NotFoundException('Project not found!');
    }
    return result;
  }

  async update(id: string, dto:CreateProjectDto) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Project not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async projectImage(image: string, result: Project) {
    const obj = Object.assign(result, {
      file: process.env.BASE_URL + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }

  async status(id: string, dto:StatusDto) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Project detail not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }
  

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
