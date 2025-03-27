import { Test, TestingModule } from '@nestjs/testing';
import { ContactusDetailsController } from './contactus-details.controller';
import { ContactusDetailsService } from './contactus-details.service';

describe('ContactusDetailsController', () => {
  let controller: ContactusDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactusDetailsController],
      providers: [ContactusDetailsService],
    }).compile();

    controller = module.get<ContactusDetailsController>(ContactusDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
