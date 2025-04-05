import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
  ){}
 async create(createBlogDto: CreateBlogDto, userId:string) {

    const result = await this.blogRepo.findOne({where:{title:createBlogDto.title}});
    if(result){
      throw new ConflictException('Blogs alredy exists');
    }
    const obj = this.blogRepo.create(createBlogDto);
    obj.accountId=userId;
    return this.blogRepo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';

    const queryBuilder = this.blogRepo.createQueryBuilder('blog');

    if (keyword) {
        queryBuilder.andWhere(
            '(blog.title LIKE :keyword OR blog.description LIKE :keyword)', 
            { keyword: `%${keyword}%` }
        );
    }

    queryBuilder.take(dto.limit).skip(dto.offset);

    const [result, count] = await queryBuilder.getManyAndCount();

    return { result, count };
}

  async findOne(id:string){
    const result = await this.blogRepo.findOne({
      where:{id:id}
    });
    if(!result){
      throw new NotFoundException('Blog not found..!')
    }
    return result;
  }

  async update(id:string, dto:UpdateBlogDto){
    const result = await this.blogRepo.findOne({where:{id:id}});
    if(!result){
      throw new NotFoundException('Blog not found...!')
    }
    const obj = Object.assign(result,dto);
    return this.blogRepo.save(obj);
  }

  async image(image:string, result:Blog){
    const obj = Object.assign(result,{
      image:process.env.BASE_URL + image,
      imagePath:image,
    });
    return this.blogRepo.save(obj);
  }
}
