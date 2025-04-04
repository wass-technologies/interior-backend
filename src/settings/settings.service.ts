import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private readonly repo: Repository<Setting>,
    @InjectRepository(Admin) private readonly admin : Repository<Admin>,

  ) {}
  async create(dto: CreateSettingDto,user:Admin) {
    const obj = this.repo.create(dto);
    obj.admin=user
    return this.repo.save(obj);

  }
  async findAllSettings(dto: CommonPaginationDto) {
    const keyword =dto.keyword || '' ;

    const queryBuilder = this.repo.createQueryBuilder('setting');

    if (keyword) {
      queryBuilder.where('setting.name LIKE :keyword OR setting.link LIKE :keyword', { keyword: `%${keyword}%` });
    }
    queryBuilder.take(dto.limit); 
    queryBuilder.skip(dto.offset);

    const settings = await queryBuilder.getMany();
    return settings;
  }

  async findOne(id: number) {
    const result = await this.repo
    .createQueryBuilder('setting')
    .where('setting.id = :id',{id:id})
    .getOne()
    if (!result) {
      throw new NotFoundException('Company not found!');
    }
    return result;
  }

  async getLinkByName(dto: CommonPaginationDto) {
    const keyword  = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('setting');
    if (keyword) {
      queryBuilder.where('setting.name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    queryBuilder.select(['setting.name', 'setting.link']);

    queryBuilder.take(dto.limit);
    queryBuilder.skip(dto.offset);

    const settings = await queryBuilder.getMany();
    return settings;
  }

  async getFileAndFileNameByName(dto: CommonPaginationDto) {
    const keyword  = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('setting');
    if (keyword) {
      queryBuilder.where('setting.name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    queryBuilder.select(['setting.name', 'setting.file', 'setting.fileName']);

    queryBuilder.take(dto.limit);
    queryBuilder.skip(dto.offset);

    const settings = await queryBuilder.getMany();
    return settings;
  }


  async update(id: number, dto: UpdateSettingDto) {
    const result = await this.getSetting(id);
    this.deleteSetting(id);
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async updateImage(image: string, id: number) {
    const setting = await this.getSetting(id);

    const obj = Object.assign(setting, {
      file: process.env.BASE_URL + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }

  async deleteSetting(id: number): Promise<void> {
    const setting = await this.getSetting(id); 
  
    await this.repo.remove(setting);
  }
  async getSetting(id: number): Promise<Setting> {
    const result = await this.repo.findOne({ where: { id} });
    if (!result) {
      throw new NotFoundException(`Setting with  not found`);
    }
    return result;
  }


  

 
}

