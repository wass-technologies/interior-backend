import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
