/* eslint-disable prettier/prettier */

import {  IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateVisitaDto } from './create-visita.dto';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';
import { CreateMedicoDto } from 'src/medico/dto/create-medico.dto';

export class PersonaHistoriaDto {
  
  @ValidateIf((object, value) => value!==undefined)
  @ValidateNested()
  @Type (() => CreatePersonaDto )
  user: CreatePersonaDto;
  
  @ValidateNested()
  @Type (() => CreateVisitaDto )
  historiaMedica: CreateVisitaDto;

  @ValidateIf((object, value) => value!==undefined)
  @IsOptional()
  @ValidateNested()
  @Type (() => CreateMedicoDto )
  medic: CreateMedicoDto

  @IsNotEmpty()
  enfermedades: number
}
 

/* import { CreateVisitaDto } from './create-visita.dto';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';
import { CreateMedicoDto } from 'src/medico/dto/create-medico.dto';

export class PersonaHistoriaDto {

  user: CreatePersonaDto;
  
  historiaMedica: CreateVisitaDto;

  medic: CreateMedicoDto
  
} */
