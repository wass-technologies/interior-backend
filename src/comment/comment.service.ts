import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>
  ){}
  async create(blogId:string,dto: CreateCommentDto) {
    const blog = await this.blogRepo.findOne({where: {id:blogId}})
    if(!blog){
      throw new NotFoundException('Blog Not Found...!')
    }
    const obj= this.repo.create(dto)
    obj.blogPost=blog;
    return await this.repo.save(obj);
  }

 async findAll(dto:CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('comment')
    .leftJoinAndSelect('comment.blogPost', 'blog')
    .take(dto.limit)
    .skip(dto.offset);
    if(keyword){
      queryBuilder.andWhere('(blog.name LIKE :keyword OR blog.id LIKE : keyword)',{keyword:`%${keyword}%`});

    }
    const [result, count] =await queryBuilder.getManyAndCount();
    return {result,count};
  }
  async findByBlogId(blogId: string, dto: CommonPaginationDto) {
    const blog = await this.blogRepo.findOne({ where: { id: blogId } });
  
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
  
    const queryBuilder = this.repo.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.blogPost', 'blog')
      .where('blog.id = :blogId', { blogId })
      .take(dto.limit)
      .skip(dto.offset);
  
    if (dto.keyword) {
      queryBuilder.andWhere(
        '(comment.name LIKE :keyword OR comment.content LIKE :keyword)',
        { keyword: `%${dto.keyword}%` }
      );
    }
  
    const [result, count] = await queryBuilder.getManyAndCount();
    return { result, count };
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
