import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentDetailsService } from './comment-details.service';
import { CreateCommentDetailDto } from './dto/create-comment-detail.dto';
import { UpdateCommentDetailDto } from './dto/update-comment-detail.dto';

@Controller('comment-details')
export class CommentDetailsController {
  constructor(private readonly commentDetailsService: CommentDetailsService) {}

  @Post()
  create(@Body() createCommentDetailDto: CreateCommentDetailDto) {
    return this.commentDetailsService.create(createCommentDetailDto);
  }

  @Get()
  findAll() {
    return this.commentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDetailDto: UpdateCommentDetailDto) {
    return this.commentDetailsService.update(+id, updateCommentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentDetailsService.remove(+id);
  }
}
