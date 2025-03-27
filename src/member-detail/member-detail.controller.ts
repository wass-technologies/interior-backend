import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberDetailService } from './member-detail.service';
import { CreateMemberDetailDto } from './dto/create-member-detail.dto';
import { UpdateMemberDetailDto } from './dto/update-member-detail.dto';

@Controller('member-detail')
export class MemberDetailController {
  constructor(private readonly memberDetailService: MemberDetailService) {}

  @Post()
  create(@Body() createMemberDetailDto: CreateMemberDetailDto) {
    return this.memberDetailService.create(createMemberDetailDto);
  }

  @Get()
  findAll() {
    return this.memberDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDetailDto: UpdateMemberDetailDto) {
    return this.memberDetailService.update(+id, updateMemberDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberDetailService.remove(+id);
  }
}
