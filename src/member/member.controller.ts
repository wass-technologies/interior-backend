import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  create(@Body() dto:CreateMemberDto,@CurrentUser()user:Account) {
    return this.memberService.create(dto,user);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.memberService.getAllMember(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.memberService.update(id, dto);
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
  const fileData = await this.memberService.findOne(id);
  return this.memberService.image(file.path,fileData);

  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
