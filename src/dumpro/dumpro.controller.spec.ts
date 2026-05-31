import { Test, TestingModule } from '@nestjs/testing';
import { DumproController } from './dumpro.controller';

describe('DumproController', () => {
  let controller: DumproController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DumproController],
    }).compile();

    controller = module.get<DumproController>(DumproController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
