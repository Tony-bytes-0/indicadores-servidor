import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNivelAcademicoDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  nivelAcademico: string;
}
