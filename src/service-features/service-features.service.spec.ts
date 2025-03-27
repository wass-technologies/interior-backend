import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeaturesService } from './service-features.service';

describe('ServiceFeaturesService', () => {
  let service: ServiceFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceFeaturesService],
    }).compile();

    service = module.get<ServiceFeaturesService>(ServiceFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
