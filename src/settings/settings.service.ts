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
  async create(dto: CreateSettingDto,user:Admin,image:string) {
    const result = await this.repo.findOne({
      where:[
        {name:dto.name},
        {link:dto.link}
      ],
    });
    if(result){
      throw new ConflictException('Alredy exists!')
    }
    const obj = this.repo.create(dto);
    obj.file=process.env.BASE_URL+image;
    obj.fileName=image;
    obj.admin=user;

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
  async update(id: number, dto: UpdateSettingDto) {
    const result = await this.getSetting(id);
    this.deleteSetting(id);
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async updateImage(image: string, id: number) {
    const setting = await this.getSetting(id);

    const updatedSetting = Object.assign(setting, {
      file: process.env.BL_CDN_LINK + image,
      fileName: image,
    });
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

