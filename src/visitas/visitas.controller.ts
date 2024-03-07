import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VisitasService } from './visitas.service';
//import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
//import { CreatePersonaDto } from 'src/persona/dto/create-persona.dto';
import { PersonaHistoriaDto } from './dto/persona-historia-dto';

@Controller('visitas')
export class VisitasController {
  constructor(private readonly visitasService: VisitasService) {}

  /*   @Post()
  create(@Body() createVisitaDto: CreateVisitaDto) {
    return this.visitasService.create(createVisitaDto);
  } */

  @Post('personaHistoria')
  personaHistoria(@Body() personaHistoriaDto: PersonaHistoriaDto) {
    return this.visitasService.personaHistoria(personaHistoriaDto);
  }

  @Get()
  findAll() {
    return this.visitasService.findAll();
  }

  @Get('count')
  countVisits() {
    return this.visitasService.countVisits();
  }
  @Get('ordenar')
  orderByMost() {
    return this.visitasService.orderByMost();
  }
  @Get('mes')
  async getOrderBy(@Query('dateMonth') dateMonth: Date) {
    return this.visitasService.orderByMonth(dateMonth);
  }
  @Get('ordenarPorGenero')
  async orderByGender() {
    return this.visitasService.orderByGender();
  }
  @Get('ordenarPorEdad')
  async orderByAge() {
    return this.visitasService.orderByAge();
  }
  @Get('allMonths')
  async allMonths() {
    return this.visitasService.allMonths();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitaDto: UpdateVisitaDto) {
    return this.visitasService.update(+id, updateVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitasService.remove(+id);
  }
}
