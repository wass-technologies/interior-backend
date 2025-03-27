import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingDetailsService } from './rating-details.service';
import { CreateRatingDetailDto } from './dto/create-rating-detail.dto';
import { UpdateRatingDetailDto } from './dto/update-rating-detail.dto';

@Controller('rating-details')
export class RatingDetailsController {
  constructor(private readonly ratingDetailsService: RatingDetailsService) {}

  @Post()
  create(@Body() createRatingDetailDto: CreateRatingDetailDto) {
    return this.ratingDetailsService.create(createRatingDetailDto);
  }

  @Get()
  findAll() {
    return this.ratingDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDetailDto: UpdateRatingDetailDto) {
    return this.ratingDetailsService.update(+id, updateRatingDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingDetailsService.remove(+id);
  }
}
