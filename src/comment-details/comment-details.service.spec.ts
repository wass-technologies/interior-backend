import { Test, TestingModule } from '@nestjs/testing';
import { CommentDetailsService } from './comment-details.service';

describe('CommentDetailsService', () => {
  let service: CommentDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentDetailsService],
    }).compile();

    service = module.get<CommentDetailsService>(CommentDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
