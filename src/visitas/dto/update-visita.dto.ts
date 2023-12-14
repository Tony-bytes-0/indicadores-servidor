import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitaDto } from './create-visita.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateVisitaDto extends PartialType(CreateVisitaDto) {
  @IsString()
  altura: string; //medical record data
  @IsString()
  peso: string;
  @IsString()
  temperatura: string;
  @IsString()
  tensionSistolica: string;
  @IsString()
  tensionDiastolica: string;
  @IsDate()
  fechaVisita: Date;
  @IsString()
  observaciones: string;
}
