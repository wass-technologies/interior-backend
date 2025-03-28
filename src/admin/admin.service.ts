import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  
  async createAdmin(dto:CreateAdminDto) {
    const existingAdmin = await this.adminRepository.findOne({ where:{emailId:dto.email} });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }
    const newAdmin = this.adminRepository.create({emailId:dto.email,name:dto.name});
    return this.adminRepository.save(newAdmin);
  }


}
