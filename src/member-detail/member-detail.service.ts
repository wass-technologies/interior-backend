import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberDetail } from './entities/member-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class MemberDetailService {
  constructor(
    @InjectRepository(MemberDetail) private readonly memberRepo: Repository<MemberDetail>,
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

  async findAll(dto:CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const queryBuilder = this.memberRepo.createQueryBuilder('member_detail');
    if(keyword){
      queryBuilder.andWhere(
        '(member_detail.name LIKE :keyword OR member_detail.designation LIKE :keyword)',
        {keyword: `%${keyword}%`}
      );
    }
    queryBuilder.take(dto.limit).skip(dto.offset);

    const [reasult,count]=await queryBuilder.getManyAndCount();
    return {reasult,count};
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

    async image(image:string, result:MemberDetail){
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
