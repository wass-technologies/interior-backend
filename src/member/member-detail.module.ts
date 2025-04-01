import { Module } from '@nestjs/common';
import { MemberService } from './member-detail.service';
import { MemberController } from './member-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Member,Admin])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
