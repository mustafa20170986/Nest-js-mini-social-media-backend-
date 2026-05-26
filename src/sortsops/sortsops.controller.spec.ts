import { Test, TestingModule } from '@nestjs/testing';
import { SortsopsController } from './sortsops.controller';

describe('SortsopsController', () => {
  let controller: SortsopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SortsopsController],
    }).compile();

    controller = module.get<SortsopsController>(SortsopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
