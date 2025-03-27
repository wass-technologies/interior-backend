import { Test, TestingModule } from '@nestjs/testing';
import { RatingDetailsController } from './rating-details.controller';
import { RatingDetailsService } from './rating-details.service';

describe('RatingDetailsController', () => {
  let controller: RatingDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingDetailsController],
      providers: [RatingDetailsService],
    }).compile();

    controller = module.get<RatingDetailsController>(RatingDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
