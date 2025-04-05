import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, PaginationDto, StatusDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProjectDto: CreateProjectDto,@CurrentUser()user:Account) {
    return this.projectService.createProject(createProjectDto,user.id);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.projectService.findAll(dto);
  }

  @Get('images')
  async getProjectImagesForSlider(@Query()dto:PaginationDto) {
    return this.projectService.findProjectImagesByCategory(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto:CreateProjectDto) {
    return this.projectService.update(id, dto);
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
    const fileData = await this.projectService.findProject(id);
    return this.projectService.projectImage(file.path, fileData);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  status(@Param('id') id: string, @Body() dto:StatusDto) {
    return this.projectService.status(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
