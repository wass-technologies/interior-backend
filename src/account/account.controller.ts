import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, PaginationDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from './entities/account.entity';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id/settings')
  async getSettings(@Param('id') id: string,@CurrentUser()user:Account) {
    return this.accountService.Settingsdetails(user.id);
  }

  @Get(':id/member')
  async getSingleMember(@Param('id') id: string) {
    return this.accountService.member(id);
  }

  @Get('members')
  async getMembers(@Query() dto: CommonPaginationDto) {
    return this.accountService.getMembers(dto);
  }

  @Get('events')
  async getEvents(@Query() dto: CommonPaginationDto) {
    return this.accountService.getEvents(dto);
  }

  @Get('projects')
  async getProjects(@Query() dto: PaginationDto) {
    return this.accountService.getProjects(dto);
  }

  @Get('services')
  async getServices(@Query() dto: PaginationDto) {
    return this.accountService.getServices(dto);
  }
}
