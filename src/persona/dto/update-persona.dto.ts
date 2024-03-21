import { IsString, IsDateString, IsEnum } from 'class-validator';
import { gender } from '../enum/genero.enum';
import { Localidad } from 'src/localidad/entities/localidad.entity';

export class UpdatePersonaDto {
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
  telefono: string;
  telefonoEmergencia: string;
  localidad: Localidad;
}
