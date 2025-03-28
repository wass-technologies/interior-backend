import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Blog,Admin])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
