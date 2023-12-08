import { IsDateString, IsString } from 'class-validator';

export class UpdateHistoriaMedicaDto {
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
