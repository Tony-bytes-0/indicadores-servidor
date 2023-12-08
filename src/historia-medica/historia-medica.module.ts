import { Module } from '@nestjs/common';
import { HistoriaMedicaService } from './historia-medica.service';
import { HistoriaMedicaController } from './historia-medica.controller';
import { HistoriaMedica } from './entities/historia-medica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaMedica])],
  controllers: [HistoriaMedicaController],
  providers: [HistoriaMedicaService],
})
export class HistoriaMedicaModule {}
