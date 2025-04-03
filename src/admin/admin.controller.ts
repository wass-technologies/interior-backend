import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('contactus')
  async getContactUs(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllContactUs(paginationDto);
  }
   
  @Get('subscribers')
  async getEmailSubscribers(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllEmailSubscribers(paginationDto);
  }

  @Get('settings')
  async getSettings(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllSettings(paginationDto);
  }
  
  @Get('events')
  async getEvents(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllEvents(paginationDto);
  }
  
  @Get('feedbacks')
  async getFeedbacks(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllFeedbacks(paginationDto);
  }
  @Get('members')
  async getMembers(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllMembers(paginationDto);
  }
  @Get('categories')
  async getAllCategories(@Query() dto: CommonPaginationDto) {
  return this.adminService.getAllCategories(dto);
}

  @Get('services')
  async getServices(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllServices(paginationDto);
  }
  @Get('projects')
  async getProjects(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllProjects(paginationDto);
  }

  @Get('blogs')
  async getBlogsWithComments(@Query() paginationDto: CommonPaginationDto) {
    return this.adminService.getAllBlogsWithComments(paginationDto);
  }

}
