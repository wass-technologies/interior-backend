import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDetailsService } from './project-details.service';

describe('ProjectDetailsService', () => {
  let service: ProjectDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectDetailsService],
    }).compile();

    service = module.get<ProjectDetailsService>(ProjectDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
