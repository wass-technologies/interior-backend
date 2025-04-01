import { Controller, Get, Post, Body, Patch, Param, Delete, Query, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EventDetailsService } from './event-details.service';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
import { UpdateEventDetailDto } from './dto/update-event-detail.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';

@Controller('event-details')
export class EventDetailsController {
  constructor(private readonly eventDetailsService: EventDetailsService) {}

  @Post()
  create(@Body() createEventDetailDto: CreateEventDetailDto) {
    return this.eventDetailsService.create(createEventDetailDto);
  }

  @Get()
  findAll(@Query() dto:CommonPaginationDto){
    return this.eventDetailsService.findAll(dto);
  }
  @Get(":id")
  findOne(@Param(':id') id: string){
    return this.eventDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() dot:UpdateEventDetailDto){
    return this.eventDetailsService.update(id,dot);
  }
  
  @Put('image/:id')
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
  const fileData = await this.eventDetailsService.findOne(id);
  return this.eventDetailsService.image(file.path,fileData);

  }


}
