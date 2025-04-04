import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from 'src/admin/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import APIFeatures from 'src/utills/apiFeatures.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    @InjectRepository(Admin) private readonly repo:Repository<Admin>,
  )
  {}

  async signIn(dto:LoginDto){
    const user = await this.getSigninUser(dto.email);
    if(!user){
      throw new NotFoundException('Admin not found..!')
    }
    const comparePassword = await bcrypt.compare(dto.password,user.password);
    if(!comparePassword){
      throw new UnauthorizedException('Invalid PassWord....')
    }
    const token = await APIFeatures.assignJwtToken(user.id,this.jwtService);
    return { token };
  }

  async validate(id: string) {
    const user = await this.getUserDetails(id);
  
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
  
    return user;
  }
  private getSigninUser = async (loginId: string): Promise<any> => {
    const query = this.repo
      .createQueryBuilder('admin')
      .select(['admin.id', 'admin.emailId', 'admin.password']);
    const result = await query
      .andWhere('admin.emailId = :loginId', { loginId })
      .getOne();
  
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  }

  private getUserDetails = async (loginId: string): Promise<any> => {
    const query = this.repo
      .createQueryBuilder('admin')
      .select(['admin.id', 'admin.emailId', 'admin.password']);
    const result = await query
      .andWhere('admin.id = :loginId', { loginId })
      .getOne();
  
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };
  }
