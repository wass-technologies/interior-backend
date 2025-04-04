import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Query, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}


  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() dto: CreateSettingDto, 
    @CurrentUser() user: Admin,) 
  {
    return this.settingsService.create(dto, user);
  }

  @Get()
  async findAll(@Query() query: CommonPaginationDto) {
    return this.settingsService.findAllSettings(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Get('link')
  async getLinkByName(@Query() paginationDto: CommonPaginationDto) {
    return this.settingsService.getLinkByName(paginationDto);
  }

  @Get('logo')
  async getFileAndFileNameByName(@Query() paginationDto: CommonPaginationDto) {
    return this.settingsService.getFileAndFileNameByName(paginationDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string, 
    @Body() dto: UpdateSettingDto,
  ) {
    return this.settingsService.update(+id, dto);
  }

  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/Settings',
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
  async updateImage(
    @Param('id') id: number, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  )  {
    return this.settingsService.updateImage(file.path, +id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    return this.settingsService.deleteSetting(+id);
  }

}
