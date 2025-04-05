import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createEventDetailDto: CreateEventDto,@CurrentUser()user:Account) {
    return this.eventService.create(createEventDetailDto,user.id);
  }

  @Get()
  findAll(@Query() dto:CommonPaginationDto){
    return this.eventService.findAll(dto);
  }
  @Get(":id")
  findOne(@Param(':id') id: string){
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() dot:UpdateEventDto){
    return this.eventService.update(id,dot);
  }
  
  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/event',
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
  const fileData = await this.eventService.findOne(id);
  return this.eventService.image(file.path,fileData);

  }
}
