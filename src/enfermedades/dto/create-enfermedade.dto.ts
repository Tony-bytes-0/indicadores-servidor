import { IsString } from 'class-validator';

export class CreateEnfermedadeDto {
  id: number;
  @IsString()
  nombreEnfermedad: string;
}
