import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':blogId')
  create(@Param(':blogId') blogId:string,@Body() createCommentDetailDto: CreateCommentDto) {
    return this.commentService.create(blogId,createCommentDetailDto);
  }

  @Get()
  findAll(@Query()dto:CommonPaginationDto) {
    return this.commentService.findAll(dto);
  }

  @Get('blog/:blogId')
  findByBlogId(
  @Param('blogId') blogId: string,
  @Query() dto: CommonPaginationDto,
) {
  return this.commentService.findByBlogId(blogId, dto);
}


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }
}
