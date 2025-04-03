import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommonPaginationDto } from 'src/common/common-pagination.dto';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Service } from 'src/services/entities/service.entity';
import { ContactusDetail } from 'src/contactus/entities/contactus-detail.entity';
import { EmailSubscriber } from 'src/email-subscribers/entities/email-subscriber.entity';
import { EventDetail } from 'src/events/entities/event-detail.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Member } from 'src/member/entities/member.entity';
import { ProjectStatus, ServiceStatus } from 'src/enum';
import { Setting } from 'src/settings/entities/setting.entity';
import { CommentDetail } from 'src/comment/entities/comment-detail.entity';
import { Category } from 'src/category/entities/category.entity';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ContactusDetail)
    private readonly contactusRepository: Repository<ContactusDetail>,
    @InjectRepository(EmailSubscriber)
    private readonly emailSubscriberRepository: Repository<EmailSubscriber>,
    @InjectRepository(EventDetail)
    private readonly eventRepository: Repository<EventDetail>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(CommentDetail)
    private readonly commentRepository: Repository<CommentDetail>,
    @InjectRepository (Category) private readonly categoryRepository:Repository<Category>,

  ){}
  
  async getAllContactUs(dto: CommonPaginationDto) {
  const keyword = dto.keyword || ''; 

    const query = this.contactusRepository
      .createQueryBuilder('contact')
      .orderBy('contact.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere(
        'contact.name LIKE :keyword OR contact.phoneNumber LIKE :keyword OR contact.query LIKE :keyword',
        { keyword: `%${keyword}%` }
      );
    }

    const [result, total] = await query.getManyAndCount();

    return { result,total};
  }
  
  async getAllEmailSubscribers(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.emailSubscriberRepository
      .createQueryBuilder('subscriber')
      .orderBy('subscriber.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('subscriber.email LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {
      result, total };
  }
  
  async getAllSettings(paginationDto: CommonPaginationDto) {
    const { limit, offset, keyword } = paginationDto;

    const query = this.settingRepository
      .createQueryBuilder('setting')
      .select([
        'setting.id',
        'setting.name',
        'setting.link',
        'setting.file',
        'setting.fileName',
        'setting.createdAt',
        'admin.id',
        'admin.name',
        'admin.emailId',
      ])
      .leftJoin('setting.admin', 'admin')
      .orderBy('setting.createdAt', 'DESC')
      .skip(offset)
      .take(limit);

    if (keyword) {
      query.andWhere('setting.name LIKE :keyword OR setting.link LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total};
  }

  async getAllEvents(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.eventRepository
      .createQueryBuilder('event')
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
      ])
      .leftJoin('event.admin', 'admin')
      .addSelect(['admin.id', 'admin.name', 'admin.emailId'])
      .orderBy('event.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('event.title LIKE :keyword OR event.description LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total};
  }

  async getAllFeedbacks(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.feedbackRepository
      .createQueryBuilder('feedback')
      .select([
        'feedback.id',
        'feedback.name',
        'feedback.comment',
        'feedback.rating',
        'feedback.profileImage',
        'feedback.createdAt',
      ])
      .leftJoin('feedback.admin', 'admin')
      .addSelect(['admin.id', 'admin.name', 'admin.emailId'])
      .orderBy('feedback.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('feedback.name LIKE :keyword OR feedback.comment LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total,};
  }
  async getAllMembers(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.memberRepository
      .createQueryBuilder('member')
      .select([
        'member.id',
        'member.name',
        'member.designation',
        'member.file',
        'member.fileName',
        'member.socialMediaLinks',
        'member.createdAt',
      ])
      .leftJoin('member.admin', 'admin')
      .addSelect(['admin.id', 'admin.name', 'admin.emailId'])
      .orderBy('member.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('member.name LIKE :keyword OR member.designation LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total}
  }
  async getAllCategories(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
  
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.admin', 'admin')
      .leftJoin('category.projects', 'project')
      .select([
        'category.id',
        'category.name',
        'admin.id',
        'admin.name',
        'project.name',
      ])
      .skip(dto.offset)
      .take(dto.limit);
  
    if (keyword) {
      query.andWhere('category.name LIKE :keyword', { keyword: `%${keyword}%` });
    }
    const [result, total] = await query.getManyAndCount();
    return { result, total };
  }
  

 
  async getAllProjects(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.admin', 'admin')
      .leftJoin('project.category', 'category')
      .select([
        'project.id',
        'project.name',
        'project.description',
        'project.file',
        'project.fileName',
        'project.status',
        'project.createdAt',
        'admin.id',
        'admin.name',
        'admin.emailId',
        'category.id',
        'category.name',
      ])
      .where('project.status = :status', { status: ProjectStatus.ACTIVE }) // Filtering active projects
      .orderBy('project.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('project.name LIKE :keyword OR project.description LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();
    return {result,total}
    
  }

  
  async getAllServices(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.serviceRepository
      .createQueryBuilder('service')
      .leftJoin('service.admin', 'admin')
      .select([
        'service.id',
        'service.name',
        'service.description',
        'service.file',
        'service.fileName',
        'service.status',
        'service.createdAt',
        'admin.id',
        'admin.name',
        'admin.emailId',
      ])
      .where('service.status = :status', { status: ServiceStatus.ACTIVE }) // Filtering only ACTIVE services
      .orderBy('service.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('service.name LIKE :keyword OR service.description LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total}
  }

  async getAllBlogsWithComments(dto: CommonPaginationDto) {
    const  keyword  = dto.keyword || '';

    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoin('blog.admin', 'admin')
      .leftJoin('blog.comments', 'comment')
      .select([
        'blog.id',
        'blog.title',
        'blog.author',
        'blog.desc',
        'blog.date',
        'blog.image',
        'blog.imagePath',
        'blog.createdAt',
        'blog.updatedAt',
        'admin.id',
        'admin.name',
        'comment.id',
        'comment.name',
        'comment.email',
        'comment.content',
        'comment.createdAt',
      ])
      .orderBy('blog.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (keyword) {
      query.andWhere('blog.title LIKE :keyword OR blog.desc LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [result, total] = await query.getManyAndCount();

    return {result,total};
  }
  }