import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member-detail.controller';
import { MemberService } from './member-detail.service';

describe('MemberDetailController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
