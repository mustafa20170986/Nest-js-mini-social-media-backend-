import { Test, TestingModule } from '@nestjs/testing';
import { DumproService } from './dumpro.service';

describe('DumproService', () => {
  let service: DumproService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DumproService],
    }).compile();

    service = module.get<DumproService>(DumproService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
