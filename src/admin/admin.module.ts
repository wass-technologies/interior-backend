import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports:[    TypeOrmModule.forFeature([Admin,Project,Service]),
],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
