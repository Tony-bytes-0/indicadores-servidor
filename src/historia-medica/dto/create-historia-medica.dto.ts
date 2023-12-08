import { IsDateString, IsString } from 'class-validator';

export class CreateHistoriaMedicaDto {
  @IsString()
  altura: string;
  @IsString()
  peso: string;
  @IsString()
  temperatura: string;
  @IsString()
  tensionSistolica: string;
  @IsString()
  tensionDiastolica: string;
  @IsDateString()
  fechaRevision: Date;
}
