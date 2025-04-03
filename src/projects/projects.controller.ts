import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, PaginationDto, StatusDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProjectDto: CreateProjectDto,@CurrentUser()user:Admin) {
    return this.projectsService.createProject(createProjectDto,user);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.projectsService.findAll(dto);
  }

  @Get('slider-images')
  async getProjectImagesForSlider() {
    return this.projectsService.getProjectImagesForSlider();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto:CreateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects',
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
    const fileData = await this.projectsService.findProject(id);
    return this.projectsService.projectImage(file.path, fileData);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  status(@Param('id') id: string, @Body() dto:StatusDto) {
    return this.projectsService.status(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
