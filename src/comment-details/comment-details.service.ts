import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDetailDto } from './dto/create-comment-detail.dto';
import { UpdateCommentDetailDto } from './dto/update-comment-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { CommentDetail } from './entities/comment-detail.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class CommentDetailsService {
  constructor(
    @InjectRepository(CommentDetail) private readonly repo: Repository<CommentDetail>,
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>
  ){}
  async create(blogId:string,createCommentDetailDto: CreateCommentDetailDto) {
    const blog = await this.blogRepo.findOne({where: {id:blogId}})
    if(!blog){
      throw new NotFoundException('Blog Not Found...!')
    }
    const obj= Object.assign({},createCommentDetailDto,{blogPost:blog})
    return await this.repo.save(obj);
  }

 async findAll(dto:CommonPaginationDto) {
    const keyword = dto.keyword || '';

    const queryBuilder = this.repo.createQueryBuilder('comment_detail')
    .leftJoinAndSelect('comment_detail.blogPost', 'blog')
    .take(dto.limit)
    .skip(dto.offset);
    if(keyword){
      queryBuilder.andWhere('(comment_detail.name LIKE :keyword OR comment_detail.content LIKE : keyword)',{keyword:`%${keyword}%`});

    }
    const [result, count] =await queryBuilder.getManyAndCount();
    return {result,count};
  }

  async findOne(id: number) {
    const comment= await this.repo.findOne({
      where:{id},
      relations:['blogPost']
    })
    if (!comment) {
      throw new NotFoundException('Comment Not Found...!');
    }
    return comment;
  }


}
