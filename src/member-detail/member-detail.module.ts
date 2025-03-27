import { Module } from '@nestjs/common';
import { MemberDetailService } from './member-detail.service';
import { MemberDetailController } from './member-detail.controller';

@Module({
  controllers: [MemberDetailController],
  providers: [MemberDetailService],
})
export class MemberDetailModule {}
