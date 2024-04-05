import { Module } from '@nestjs/common';
import { NivelAcademicoService } from './nivel-academico.service';
import { NivelAcademicoController } from './nivel-academico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademico } from './entities/nivel-academico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelAcademico])],
  controllers: [NivelAcademicoController],
  providers: [NivelAcademicoService],
})
export class NivelAcademicoModule {}
