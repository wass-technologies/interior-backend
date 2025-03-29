import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto, PaginationDto } from './dto/create-social-media.dto';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  create(@Body() dto: CreateSocialMediaDto) {
    return this.socialMediaService.create(dto);
  }

  @Get()
  findAll(@Query()dto:PaginationDto) {
    return this.socialMediaService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(id);
  }
}
