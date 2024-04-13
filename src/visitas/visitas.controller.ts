import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { VisitasReportsServices } from './visitas.services.reports';
//import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
//import { CreatePersonaDto } from 'src/persona/dto/create-persona.dto';
import { PersonaHistoriaDto } from './dto/persona-historia-dto';

@Controller('visitas')
export class VisitasController {
  constructor(
    private readonly visitasService: VisitasService,
    private readonly visitasReportService: VisitasReportsServices,
  ) {}

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
  @Get('visitCount')
  visitCount() {
    return this.visitasService.visitCount();
  }
  @Get('satisfaccion')
  async satisfactionCount(@Query('param') param: string) {
    return await this.visitasService.satisfactionCount(param);
  }
  @Get('reports')
  async reports(
    @Query('enfermedad') enfermedad: string,
    @Query('localidad') localidad: string,
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: Date,
    @Query('edadMin') edadMin: string,
    @Query('edadMax') edadMax: string,
    @Query('genero') genero: string,
  ) {
    return await this.visitasReportService.reports(
      localidad,
      fechaInicio,
      fechaFin,
      edadMax,
      edadMin,
      enfermedad,
      genero,
    );
  }
  @Get('personalReport') async personalReport(
    @Query('identificacion') identificacion: string,
  ) {
    return await this.visitasReportService.personalReport(identificacion);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVisitaDto: UpdateVisitaDto) {
    return this.visitasService.update(+id, updateVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitasService.remove(+id);
  }
}
