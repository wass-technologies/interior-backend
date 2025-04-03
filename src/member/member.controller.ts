import { Controller, Get, Post, Body, Patch, Param, Delete, Query, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { MemberService } from './member.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(private readonly memberDetailService: MemberService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  create(@Body() dto: CreateMemberDetailDto,@CurrentUser()user:Admin) {
    return this.memberDetailService.create(dto,user);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.memberDetailService.getAllMember(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberDetailService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateMemberDetailDto) {
    return this.memberDetailService.update(id, dto);
  }
  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.memberDetailService.remove(id);
  }
}