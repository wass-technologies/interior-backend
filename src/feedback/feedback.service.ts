import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
) {}
async create(dto: CreateFeedbackDto,user:Admin) {

  const obj = this.repo.create(dto);
  obj.admin=user;
  return await this.repo.save(obj);
}

async findAll(dto: CommonPaginationDto) {

  const query = this.repo.createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.admin', 'admin')
      .orderBy('feedback.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

  const [result, total] = await query.getManyAndCount();

  return {result,total};
}

async findOne(id: string){
  const feedback = await this.repo.findOne({
      where: { id },
      relations: ['admin'],
  });

  if (!feedback) {
      throw new NotFoundException('No Feedbak Found!');
  }

  return feedback;
}

async update(id: string, updateFeedbackDto: UpdateFeedbackDto){
  await this.repo.update(id, updateFeedbackDto);
  return this.findOne(id);
}

  async image(image:string, result:Feedback){
    const obj = Object.assign(result,{
      profileImage:image,
    });
    return this.repo.save(obj);
  }

async remove(id: string): Promise<void> {
  const result = await this.repo.delete(id);
  if (result.affected === 0) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
  }
}
}
