import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnfermedadeDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  nombreEnfermedad: string;
}
