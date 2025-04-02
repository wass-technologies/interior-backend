import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CommentDetailsService } from './comment-details.service';
import { CreateCommentDetailDto } from './dto/create-comment-detail.dto';
import { UpdateCommentDetailDto } from './dto/update-comment-detail.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentDetailsController {
  constructor(private readonly commentDetailsService: CommentDetailsService) {}

  @Post(':blogId')
  create(@Param(':blogId') blogId:string,@Body() createCommentDetailDto: CreateCommentDetailDto) {
    return this.commentDetailsService.create(blogId,createCommentDetailDto);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.commentDetailsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentDetailsService.findOne(id);
  }

}
