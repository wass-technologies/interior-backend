import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto, PaginationDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Brackets, Repository } from 'typeorm';
import { FeedbackService } from 'src/feedback/feedback.service';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly repo: Repository<Account>,
      ) {}

      async Settingsdetails(id:string){
        const result = await this.repo
        .createQueryBuilder('account')
        .leftJoinAndSelect('account.settings', 'setting')
        .select([
          'setting.id',
          'setting.accountId',
          'setting.fbLink',
          'setting.twLink',
          'setting.instaLink',
          'setting.linkdinLink',
          'setting.file',
          'setting.fileName',
          'setting.createdAt',
          'setting.updatedAt', 
        ])
        
        .getOne();
        if (!result) {
          throw new NotFoundException(' Not Found!');
        }
        return{result}
      }
      async member(id:string){
        const result = await this.repo
        .createQueryBuilder('account')
        .leftJoinAndSelect('account.members', 'member')
        .select([
          'member.id',
          'member.name',
          'member.designation',
          'member.file',
          'member.fileName',
          'member.linkDinLink',
          'member.twLinkl',
          'member.facLink',
          'member.insLink',
          'member.createdAt',
          'member.updatedAt',
        ])
        .where('member.id = :id ', {
          id: id
        })
        .getOne();
        if (!result) {
          throw new NotFoundException(' Not Found!');
        }
        return{result}
      }
      
      async getMembers(dto: CommonPaginationDto) {
        const keyword = dto.keyword || '';
      
        const [result, total] = await this.repo
          .createQueryBuilder('account')
          .leftJoinAndSelect('account.members', 'member')
          .select([
            'member.id',
            'member.name',
            'member.designation',
            'member.file',
            'member.fileName',
            'member.linkDinLink',
            'member.twLinkl',
            'member.facLink',
            'member.insLink',
            'member.createdAt',
            'member.updatedAt',
          ])
          .where(
            new Brackets((qb) => {
              qb.where(
                'member.name LIKE :keyword OR member.designation LIKE :keyword',
                { keyword: `%${keyword}%` },
              );
            }),
          )
          .orderBy('member.name', 'ASC')
          .skip(dto.offset)
          .take(dto.limit)
          .getManyAndCount();
      
        return { result, total };
      }
    
      
      async getEvents(dto: CommonPaginationDto) {
        const keyword = dto.keyword || '';
      
        const [result, total] = await this.repo
          .createQueryBuilder('account')
          .leftJoinAndSelect('account.events', 'event')
          .select([
            'event.id',
            'event.title',
            'event.description',
            'event.eventDate',
            'event.month',
            'event.day',
            'event.image',
            'event.imagePath',
            'event.createdAt',
            'event.updatedAt',
          ])
          .where(
            new Brackets((qb) => {
              qb.where(
                'event.title LIKE :keyword OR event.description LIKE :keyword',
                {
                  keyword: `%${keyword}%`,
                },
              );
            }),
          )
          .orderBy('event.eventDate', 'DESC') // or 'event.title', 'ASC'
          .skip(dto.offset)
          .take(dto.limit)
          .getManyAndCount();
      
        return { result, total };
      }
      

      async getProjects(dto:PaginationDto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
          .createQueryBuilder('account')
          .leftJoinAndSelect('account.projects', 'project')
          .leftJoinAndSelect('project.category', 'category')
          .select([
            'project.id',
            'project.accountId',
            'project.name',
            'project.description',
            'project.file',
            'project.fileName',
            'project.status',
            'project.createdAt',
            'project.updatedAt',
            'category.id',      
            'category.name'      
          ])
          .where('project.status = :status', {
            status: dto.status,
          })
          .andWhere(
            new Brackets((qb) => {
              qb.where(
                'project.name LIKE :name OR category.name LIKE :name',
                {
                  name: '%' + keyword + '%',
                },
              );
            }),
          )  
          .orderBy({ 'companyDetail.name': 'ASC' })
          .skip(dto.offset)
          .take(dto.limit)
          .getManyAndCount();



          return { result, total };
      }
    

async getServices(dto: PaginationDto) {
  const keyword = dto.keyword || '';

  const [result, total] = await this.repo
    .createQueryBuilder('account')
    .leftJoinAndSelect('account.services', 'service')
    .select([
      'service.id',
      'service.accountId',
      'service.name',
      'service.description',
      'service.file',
      'service.fileName',
      'service.status',
      'service.createdAt',
      'service.updatedAt',
    ])
    .where('service.status = :status', {
      status: dto.status,
    })
    .andWhere(
      new Brackets((qb) => {
        qb.where('service.name LIKE :name OR service.description LIKE :name', {
          name: `%${keyword}%`,
        });
      }),
    )
    .orderBy('service.name', 'ASC')
    .skip(dto.offset)
    .take(dto.limit)
    .getManyAndCount();

  return { result, total };
}



      
      
      



}
