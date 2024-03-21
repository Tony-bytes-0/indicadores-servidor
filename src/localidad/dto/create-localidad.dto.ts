import { IsNotEmpty } from 'class-validator';

export class CreateLocalidadDto {
  @IsNotEmpty()
  nombreLocalidad: string;
}
