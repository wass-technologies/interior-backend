import { Controller, Get, Post, Body, Patch, Param, Delete, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { Admin } from 'src/admin/entities/admin.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateServiceDto, PaginationDto, StatusDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateServiceDto,@CurrentUser()user:Admin) {
    return this.servicesService.createService(dto,user);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.servicesService.findAll(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto:CreateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/service',
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
  async projectImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.servicesService.findService(id);
    return this.servicesService.serviceImage(file.path, fileData);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  status(@Param('id') id: string, @Body() dto:StatusDto) {
    return this.servicesService.status(id, dto);
  }

}
