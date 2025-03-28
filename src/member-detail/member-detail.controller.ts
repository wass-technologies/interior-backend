import { Controller, Get, Post, Body, Patch, Param, Delete, Query, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MemberDetailService } from './member-detail.service';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';

@Controller('member-detail')
export class MemberDetailController {
  constructor(private readonly memberDetailService: MemberDetailService) {}

  @Post()
  create(@Body() dto: CreateMemberDetailDto) {
    return this.memberDetailService.create(dto);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.memberDetailService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDetailDto) {
    return this.memberDetailService.update(id, dto);
  }
    @Put('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/member',
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
  const fileData = await this.memberDetailService.findOne(id);
  return this.memberDetailService.image(file.path,fileData);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberDetailService.remove(id);
  }
}
