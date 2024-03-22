/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitas } from './entities/visitas.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class VisitasReportsServices {
  constructor(
    @InjectRepository(Visitas)
    private readonly visitasRepository: Repository<Visitas>,
    @InjectRepository(Persona) private readonly personRepo: Repository<Persona>,
  ) {}
  async sitesCount() {
    return await this.visitasRepository.query(`
    SELECT localidad."nombreLocalidad", COUNT(localidad."nombreLocalidad")
    FROM visitas
    `)
  }
}
