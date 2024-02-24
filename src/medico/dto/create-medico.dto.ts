import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty()
  sacs: string;
  @IsNotEmpty()
  @IsString()
  nombreMedico: string;
  @IsNotEmpty()
  @IsString()
  especialidad: string;
}
