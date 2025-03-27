import { Test, TestingModule } from '@nestjs/testing';
import { ProjectFeaturesController } from './project-features.controller';
import { ProjectFeaturesService } from './project-features.service';

describe('ProjectFeaturesController', () => {
  let controller: ProjectFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectFeaturesController],
      providers: [ProjectFeaturesService],
    }).compile();

    controller = module.get<ProjectFeaturesController>(ProjectFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
