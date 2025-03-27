import { Test, TestingModule } from '@nestjs/testing';
import { ServiceImageController } from './service-image.controller';
import { ServiceImageService } from './service-image.service';

describe('ServiceImageController', () => {
  let controller: ServiceImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceImageController],
      providers: [ServiceImageService],
    }).compile();

    controller = module.get<ServiceImageController>(ServiceImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
