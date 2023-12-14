import { IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  sacs: string;
  @IsString()
  nombreMedico: string;
  @IsString()
  especialidad: string;
}
