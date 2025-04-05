import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, PaginationDto, StatusDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateServiceDto,@CurrentUser()user:Account) {
    return this.serviceService.createService(dto,user.id);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.serviceService.findAll(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto:CreateServiceDto) {
    return this.serviceService.update(id, dto);
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
    const fileData = await this.serviceService.findService(id);
    return this.serviceService.serviceImage(file.path, fileData);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  status(@Param('id') id: string, @Body() dto:StatusDto) {
    return this.serviceService.status(id, dto);
  }
}
