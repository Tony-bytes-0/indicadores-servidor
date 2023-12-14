import { IsString, IsDateString, IsEnum } from 'class-validator';
import { gender } from '../enum/genero.enum';

export class CreatePersonaDto {
  @IsString()
  nombre: string;
  apellido: string;
  identificacion: string;
  @IsDateString()
  fechaNacimiento: Date;
  direccion: string;
  tipoSangre: string;
  @IsEnum(gender)
  @IsString()
  genero: gender;
  @IsString()
  telefono: string;
  @IsString()
  telefonoEmergencia: string;
  @IsString()
  alergias: string;
}
