import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaMedicaService } from './historia-medica.service';

describe('HistoriaMedicaService', () => {
  let service: HistoriaMedicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriaMedicaService],
    }).compile();

    service = module.get<HistoriaMedicaService>(HistoriaMedicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
