import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private readonly repo: Repository<Setting>,

  ) {}
  async create(dto: CreateSettingDto,userId:string) {
    const obj = this.repo.create(dto);
    obj.accountId=userId;
    return this.repo.save(obj);

  }
  async findAllSettings(dto: CommonPaginationDto) {
    const keyword = dto.keyword || ''; 
  
    const queryBuilder = this.repo.createQueryBuilder('setting');
    queryBuilder.select([
      'setting.id',
      'setting.accountId',
      'setting.fbLink',
      'setting.twLink',
      'setting.instaLink',
      'setting.linkdinLink',
      'setting.file',
      'setting.fileName',
      'setting.createdAt',
      'setting.updatedAt',
      'setting.accountId', 
    ]);
    if (keyword) {
      queryBuilder.where(
        'setting.fbLink LIKE :keyword OR setting.twLink LIKE :keyword OR setting.instaLink LIKE :keyword OR setting.linkdinLink LIKE :keyword',
        { keyword: `%${keyword}%` }
      );
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


  async update(id: string, dto: UpdateSettingDto) {
    const result = await this.getSetting(id);
    this.deleteSetting(id);
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async updateImage(image: string, id: string) {
    const setting = await this.getSetting(id);

    const obj = Object.assign(setting, {
      file: process.env.BASE_URL + image,
      fileName: image,
    });
    return this.repo.save(obj);
  }

  async deleteSetting(id: string): Promise<void> {
    const setting = await this.getSetting(id); 
  
    await this.repo.remove(setting);
  }
  async getSetting(id: string): Promise<Setting> {
    const result = await this.repo.findOne({ where: { id} });
    if (!result) {
      throw new NotFoundException(`Setting with  not found`);
    }
    return result;
  }

}
