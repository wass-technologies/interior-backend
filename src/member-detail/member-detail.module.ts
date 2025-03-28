import { Module } from '@nestjs/common';
import { MemberDetailService } from './member-detail.service';
import { MemberDetailController } from './member-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberDetail } from './entities/member-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MemberDetail,Admin])],
  controllers: [MemberDetailController],
  providers: [MemberDetailService],
})
export class MemberDetailModule {}
