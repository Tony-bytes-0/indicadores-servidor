import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateVisitaDto {
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
  @Type(() => Date)
  fechaVisita: Date;
  @IsString()
  observaciones: string;
  @IsString()
  satisfaccionPaciente: string;
}
