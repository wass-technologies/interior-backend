import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
) {}
async create(dto: CreateFeedbackDto) {

  const obj = this.repo.create(dto);
  return await this.repo.save(obj);
}
async findAll(dto: CommonPaginationDto) {
  const query = this.repo
    .createQueryBuilder('feedback')
    .leftJoin('feedback.member', 'member')
    .select([
      'feedback.id',
      'feedback.comment',
      'feedback.rating',
      'feedback.createdAt',
      'feedback.updatedAt',
      'member.name',
      'member.designation',
      'member.file',
      'member.fileName',
    ])
    .orderBy('feedback.createdAt', 'DESC')
    .skip(dto.offset)
    .take(dto.limit);

  const [result, total] = await query.getManyAndCount();

  return { result, total };
}

async findAllmember(dto: CommonPaginationDto) {
  const query = this.repo
    .createQueryBuilder('feedback')
    .leftJoin('feedback.member', 'member')
    .select([
      'feedback.id',
      'member.name',
      'member.file',
      'member.fileName',
    ])
    .skip(dto.offset)
    .take(dto.limit);

  const [result, total] = await query.getManyAndCount();

  return { result, total };
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
