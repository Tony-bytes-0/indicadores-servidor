import { Module } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { VisitasController } from './visitas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitas } from './entities/visitas.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Enfermedades } from 'src/enfermedades/entities/enfermedade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visitas, Persona, Medico, Enfermedades])],
  controllers: [VisitasController],
  providers: [VisitasService],
})
export class VisitasModule {}
