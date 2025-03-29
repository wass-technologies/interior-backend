import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialMediaDto, PaginationDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { Brackets, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { MemberDetail } from 'src/member-detail/entities/member-detail.entity';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMedia)
    private readonly repo: Repository<SocialMedia>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(MemberDetail)
    private readonly memberRepo: Repository<MemberDetail>,
  ) {}
  async create(dto: CreateSocialMediaDto): Promise<SocialMedia> {
    const obj = this.repo.create(dto);
    
    if (dto.adminId) {
      const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
      if (!admin) {
        throw new NotFoundException('Admin  not found');
      }
      obj.admin = admin;
    } else if (dto.memberId) {
      const member = await this.memberRepo.findOne({ where: { id: dto.memberId } });
      if (!member) {
        throw new NotFoundException('Member  not found');
      }
      obj.member = member;
    }
    
    return await this.repo.save(obj);
  }

  async findAll(dto: PaginationDto) {
    
    const keyword=dto.keyword || '';
    
    const query = this.repo
      .createQueryBuilder('socialMedia')
      .leftJoinAndSelect('socialMedia.admin', 'admin')
      .leftJoinAndSelect('socialMedia.member', 'member')
      .select([
        'socialMedia.id',
        'socialMedia.platform',
        'socialMedia.link',
        'admin.id',
        'admin.name',
        'member.id',
        'member.name',
      ])
    if (keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('socialMedia.platform LIKE :keyword OR socialMedia.link LIKE :keyword', {
            keyword: `%${keyword}%`,
          });
        }),
      );
    }
    const [result, total] = await query.skip(dto.offset).take(dto.limit).getManyAndCount();
    return { result, total };
  }


  async findOne(id: string): Promise<SocialMedia> {
    const socialMedia = await this.repo.findOne({ where: { id }, relations: ['admin', 'member'] });
    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found`);
    }
    return socialMedia;
  }

  update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    return `This action updates a #${id} socialMedia`;
  }

  async remove(id: string): Promise<void> {
    const socialMedia = await this.findOne(id);
    await this.repo.remove(socialMedia);
  }
}
