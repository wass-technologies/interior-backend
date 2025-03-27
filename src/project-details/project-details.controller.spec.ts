import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDetailsController } from './project-details.controller';
import { ProjectDetailsService } from './project-details.service';

describe('ProjectDetailsController', () => {
  let controller: ProjectDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDetailsController],
      providers: [ProjectDetailsService],
    }).compile();

    controller = module.get<ProjectDetailsController>(ProjectDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
