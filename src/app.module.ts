import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TestingModule } from './testing/testing.module';
import { PersonaModule } from './persona/persona.module';
import { HistoriaMedicaModule } from './historia-medica/historia-medica.module';
import { VisitasModule } from './visitas/visitas.module';
import { DataSourceConfig } from './database.config';
import { EnfermedadesModule } from './enfermedades/enfermedades.module';
import { MedicoModule } from './medico/medico.module';
import { LocalidadModule } from './localidad/localidad.module';
import { NivelAcademicoModule } from './nivel-academico/nivel-academico.module';

@Module({
  imports: [
    PersonaModule,
    HistoriaMedicaModule,
    VisitasModule,
    DataSourceConfig,
    EnfermedadesModule,
    MedicoModule,
    LocalidadModule,
    NivelAcademicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
