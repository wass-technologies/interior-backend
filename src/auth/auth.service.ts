import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Account } from 'src/account/entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import APIFeatures from 'src/utills/apiFeatures.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    @InjectRepository(Account) private readonly repo:Repository<Account>,
  )
  {}

  async signIn(dto:LoginDto){
    const user = await this.getSigninUser(dto.email);
    if(!user){
      throw new NotFoundException('account not found..!')
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
      .createQueryBuilder('account')
      .select(['account.id', 'account.emailId', 'account.password']);
    const result = await query
      .andWhere('account.emailId = :loginId', { loginId })
      .getOne();
  
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  }

  private getUserDetails = async (loginId: string): Promise<any> => {
    const query = this.repo
      .createQueryBuilder('account')
      .select(['account.id', 'account.emailId', 'account.password']);
    const result = await query
      .andWhere('account.id = :loginId', { loginId })
      .getOne();
  
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };
}
