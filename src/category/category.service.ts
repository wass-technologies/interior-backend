import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly repo:Repository<Category>){}
  async create(dto: CreateCategoryDto,user:Admin) {
    const result = await this.repo.findOne({
      where:{name:dto.name}
    });
    if(result){
      throw new ConflictException('Alredy exist')
    }
    const obj = this.repo.create(dto);
    obj.admin=user;
    return this.repo.save(obj) ;
  }

  async findAll() {
    const queryBuilder = this.repo.createQueryBuilder('category');
    const [result, count] = await queryBuilder.getManyAndCount();
    return { result, count };
  }

  async findOne(id: number) {
    const result = await this.repo.findOne({where:{
      id:id
    }})
    if(!result){
      throw new NotFoundException('CateGory with this id not found')
    }
    return result;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.repo.findOne({where:{
      id:id
    }})
    if(!result){
      throw new NotFoundException('CateGory with this id not found')
    }
    const obj = Object.assign(result,UpdateCategoryDto);
    return this.repo.save(obj);
  }

  async remove(id: number) {
    const result = await this.repo.findOne({where:{
      id:id
    }})
    if(!result){
      throw new NotFoundException('CateGory with this id not found')
    }
    return this.repo.remove(result);
  }
}
