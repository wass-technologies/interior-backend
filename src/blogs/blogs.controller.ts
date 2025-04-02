import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Put, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createBlogDto: CreateBlogDto,@CurrentUser() user:Admin) {
    return this.blogsService.create(createBlogDto,user);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto){
    return this.blogsService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param(':id') id: string){
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id:string, @Body() dot:UpdateBlogDto){
    return this.blogsService.update(id,dot);
  }

  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/blogs',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async image(
    @Param('id') id:string,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new FileTypeValidator({fileType:'.(png|jpeg|jpg)'}),
          new MaxFileSizeValidator({maxSize:1024*1024*2}),
        ],
      }),
    )
    file: Express.Multer.File,

  ){
  const fileData = await this.blogsService.findOne(id);
  return this.blogsService.image(file.path,fileData);

  }
}
