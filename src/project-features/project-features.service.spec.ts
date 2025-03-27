import { Test, TestingModule } from '@nestjs/testing';
import { ProjectFeaturesService } from './project-features.service';

describe('ProjectFeaturesService', () => {
  let service: ProjectFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectFeaturesService],
    }).compile();

    service = module.get<ProjectFeaturesService>(ProjectFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
