import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelAcademicoDto } from './create-nivel-academico.dto';

export class UpdateNivelAcademicoDto extends PartialType(
  CreateNivelAcademicoDto,
) {}
