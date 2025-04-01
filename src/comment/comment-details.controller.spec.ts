import { Test, TestingModule } from '@nestjs/testing';
import { CommentDetailsController } from './comment-details.controller';
import { CommentDetailsService } from './comment-details.service';

describe('CommentDetailsController', () => {
  let controller: CommentDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentDetailsController],
      providers: [CommentDetailsService],
    }).compile();

    controller = module.get<CommentDetailsController>(CommentDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
