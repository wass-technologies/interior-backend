import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactusDetailsService } from './contactus-details.service';
import { CreateContactusDetailDto } from './dto/create-contactus-detail.dto';
import { UpdateContactusDetailDto } from './dto/update-contactus-detail.dto';

@Controller('contactus-details')
export class ContactusDetailsController {
  constructor(private readonly contactusDetailsService: ContactusDetailsService) {}

  @Post()
  create(@Body() createContactusDetailDto: CreateContactusDetailDto) {
    return this.contactusDetailsService.create(createContactusDetailDto);
  }

  @Get()
  findAll() {
    return this.contactusDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactusDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactusDetailDto: UpdateContactusDetailDto) {
    return this.contactusDetailsService.update(+id, updateContactusDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactusDetailsService.remove(+id);
  }
}
