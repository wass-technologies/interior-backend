import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Member } from './entities/member-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}
  async create(dto: CreateMemberDetailDto) {
    const admin = await this.adminRepo.findOne({where:{id:dto.adminId}});
    if(!admin){
      throw new NotFoundException('Admin not found!')
    }
    const obj = this.memberRepo.create({...dto,admin});

    return this.memberRepo.save(obj);
  }

  async getAllMember(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const query: SelectQueryBuilder<Member> = this.memberRepo
        .createQueryBuilder('member_detail')
        .leftJoinAndSelect('member_detail.socialLinks', 'social_media')
        .leftJoinAndSelect('member_detail.admin', 'admin');
        if(keyword){
          query.andWhere(
            '(member_detail.name LIKE :keyword OR member_detail.designation LIKE :keyword)',
            {keyword: `%${keyword}%`}
          );
        }

    query.skip(dto.offset).take(dto.limit);

    const [result, total] = await query.getManyAndCount();

    return {result,total};
}

  async findOne(id: string) {
    const result = await this.memberRepo.findOne({
      where:{id:id}
    });
    if(!result){
      throw new NotFoundException('Member not found..!')
    }
    return result;
    
  }

  async update(id: string, dto: UpdateMemberDetailDto) {
    const result = await this.memberRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Blog not found...!')
    }
    const obj = Object.assign(result,dto);
    return this.memberRepo.save(obj);
  }

    async image(image:string, result:Member){
      const obj = Object.assign(result,{
        profileImage:image,
      });
      return this.memberRepo.save(obj);
    }

  async remove(id: string) {
    const member = await this.memberRepo.findOne({ where: { id } });

  if (!member) {
    throw new NotFoundException(`Member with ID ${id} not found`);
  }

  await this.memberRepo.remove(member);

    return { message: 'Member has been deleted successfully' };
  }
}
