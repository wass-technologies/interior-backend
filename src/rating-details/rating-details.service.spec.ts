import { Test, TestingModule } from '@nestjs/testing';
import { RatingDetailsService } from './rating-details.service';

describe('RatingDetailsService', () => {
  let service: RatingDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingDetailsService],
    }).compile();

    service = module.get<RatingDetailsService>(RatingDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
