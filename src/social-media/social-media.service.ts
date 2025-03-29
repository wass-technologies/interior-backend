import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateSocialMediaDto) {
    if (dto.adminId) {
        return this.createForAdmin(dto);
    }
    if (dto.memberId) {
        return this.createForMember(dto);
    }
    throw new BadRequestException('Either adminId or memberId must be provided.');
}
  private async createForAdmin(dto: CreateSocialMediaDto) {
    const admin = await this.adminRepo.findOne({ where: { id: dto.adminId } });
    if (!admin) {
        throw new NotFoundException('Admin Not Found..!');
    }
    const obj = this.repo.create({
        platform: dto.platform,
        link: dto.link,
        admin,
    });
    return this.repo.save(obj);
}

private async createForMember(dto: CreateSocialMediaDto) {
    const member = await this.memberRepo.findOne({ where: { id: dto.memberId } });
    if (!member) {
        throw new NotFoundException('Member Not Found..!');
    }
    const obj = this.repo.create({
        platform: dto.platform,
        link: dto.link,
        member,
    });
    return this.repo.save(obj);
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
