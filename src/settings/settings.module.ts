import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Setting } from './entities/setting.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,Setting])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
