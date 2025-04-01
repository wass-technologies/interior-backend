import { Test, TestingModule } from '@nestjs/testing';
import { ContactusDetailsService } from './contactus-details.service';

describe('ContactusDetailsService', () => {
  let service: ContactusDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactusDetailsService],
    }).compile();

    service = module.get<ContactusDetailsService>(ContactusDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
