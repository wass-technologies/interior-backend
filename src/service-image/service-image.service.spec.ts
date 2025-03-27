import { Test, TestingModule } from '@nestjs/testing';
import { ServiceImageService } from './service-image.service';

describe('ServiceImageService', () => {
  let service: ServiceImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceImageService],
    }).compile();

    service = module.get<ServiceImageService>(ServiceImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
