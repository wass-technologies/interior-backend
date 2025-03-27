import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeaturesController } from './service-features.controller';
import { ServiceFeaturesService } from './service-features.service';

describe('ServiceFeaturesController', () => {
  let controller: ServiceFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceFeaturesController],
      providers: [ServiceFeaturesService],
    }).compile();

    controller = module.get<ServiceFeaturesController>(ServiceFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
