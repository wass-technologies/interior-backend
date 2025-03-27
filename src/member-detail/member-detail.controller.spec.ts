import { Test, TestingModule } from '@nestjs/testing';
import { MemberDetailController } from './member-detail.controller';
import { MemberDetailService } from './member-detail.service';

describe('MemberDetailController', () => {
  let controller: MemberDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberDetailController],
      providers: [MemberDetailService],
    }).compile();

    controller = module.get<MemberDetailController>(MemberDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
