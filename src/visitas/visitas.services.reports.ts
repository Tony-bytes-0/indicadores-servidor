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
    `);
  }
  async reports(
    localidad: string,
    fechaInicio: string,
    fechaFin: Date,
    edadMax: string,
    edadMin: string,
    enfermedad: string,
    genero: string,
  ) {
    const query = this.visitasRepository
      .createQueryBuilder('visitas')
      .innerJoin('visitas.persona', 'persona') // Asume que 'persona' es el nombre de la relación en tu entidad Visita
      .where('1 = 1')
      .select([
        'persona.id',
        'persona.nombre',
        'persona.apellido',
        'persona.genero',
        'persona.identificacion',
        'persona.telefono',
        'persona.telefonoEmergencia',
        'persona.fechaNacimiento',
      ])
      .addSelect('COUNT(visitas.id)', 'visitas_count')
      .groupBy('persona.id'); // Agrupa los resultados por la identificación de la persona
    if (localidad) {
      query.andWhere('persona.localidadId = :localidad', {
        localidad,
      });
    }
    if (edadMin && edadMax) {
      query.andWhere(
        `persona.fechaNacimiento BETWEEN '${edadMin}' AND '${edadMax}'`,
      );
    }
    if (genero) {
      query.andWhere('persona.genero = :genero', { genero });
    }
    if (enfermedad) {
      query.andWhere('visitas.enfermedadesId = :enfermedad', {
        enfermedad,
      });
    }
    if (fechaInicio && fechaFin) {
      query.andWhere(
        `visitas.fechaVisita BETWEEN '${fechaInicio}' AND '${fechaFin}'`,
      );
    }

    const result = await query.getRawMany();

    return result;
  }
  async personalReport(identificacion: string) {
    const query = this.visitasRepository
      .createQueryBuilder('visitas')
      .innerJoin('visitas.enfermedades', 'enfermedades')
      .innerJoin('visitas.medico', 'medico')
      .innerJoin('visitas.persona', 'persona')
      .where('persona.identificacion = :identificacion', { identificacion })
      .select([
        'visitas.fechaVisita AS fechaVisita',
        'enfermedades.nombreEnfermedad',
        'peso',
        'altura',
        'temperatura',
        'visitas.tensionSistolica',
        'visitas.tensionDiastolica',
        'observaciones',
        'visitas.satisfaccionPaciente',
        'medico.nombreMedico',
        'medico.sacs',
      ]);
    const result = await query.getRawMany();
    return result;
  }
} /*
      .andWhere('persona.localidadId = :localidad', { localidad })
      .andWhere(`persona.fechaNacimiento BETWEEN '${edadMin}' AND '${edadMax}'`)
      .andWhere('persona.genero = :genero', { genero })
      .andWhere('visitas.enfermedadesId = :enfermedad', { enfermedad })
      .andWhere(
        `visitas.fechaVisita BETWEEN '${fechaInicio}' AND '${fechaFin}'`,
      )
*/
