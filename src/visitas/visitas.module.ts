import { Module } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { VisitasController } from './visitas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitas } from './entities/visitas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visitas])],
  controllers: [VisitasController],
  providers: [VisitasService],
})
export class VisitasModule {}
