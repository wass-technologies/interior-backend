import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { MemberDetail } from 'src/member-detail/entities/member-detail.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SocialMedia,MemberDetail,Admin])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
