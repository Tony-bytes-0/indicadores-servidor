import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaMedicaController } from './historia-medica.controller';
import { HistoriaMedicaService } from './historia-medica.service';

describe('HistoriaMedicaController', () => {
  let controller: HistoriaMedicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriaMedicaController],
      providers: [HistoriaMedicaService],
    }).compile();

    controller = module.get<HistoriaMedicaController>(HistoriaMedicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
