import { Module } from '@nestjs/common';
import { ContactusService } from './contactus.service';
import { ContactusController } from './contactus.controller';
import { Contactus } from './entities/contactus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Contactus])],
  controllers: [ContactusController],
  providers: [ContactusService],
})
export class ContactusModule {}
