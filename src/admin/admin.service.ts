import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { Blog } from 'src/blogs/entities/blog.entity';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ){}
  
}