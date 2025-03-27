import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCategoryController } from './project-category.controller';
import { ProjectCategoryService } from './project-category.service';

describe('ProjectCategoryController', () => {
  let controller: ProjectCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCategoryController],
      providers: [ProjectCategoryService],
    }).compile();

    controller = module.get<ProjectCategoryController>(ProjectCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
