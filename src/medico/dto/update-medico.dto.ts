import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';
import { IsString } from 'class-validator';
import { NivelAcademico } from 'src/nivel-academico/entities/nivel-academico.entity';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  @IsString()
  sacs: string;
  @IsString()
  nombreMedico: string;
  @IsString()
  especialidad: string;
  nivelAcademico: NivelAcademico;
}
