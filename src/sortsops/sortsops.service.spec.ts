import { Test, TestingModule } from '@nestjs/testing';
import { SortsopsService } from './sortsops.service';

describe('SortsopsService', () => {
  let service: SortsopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortsopsService],
    }).compile();

    service = module.get<SortsopsService>(SortsopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
