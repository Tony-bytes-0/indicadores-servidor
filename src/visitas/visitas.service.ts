import { Injectable } from '@nestjs/common';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { PersonaHistoriaDto } from './dto/persona-historia-dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitas } from './entities/visitas.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Enfermedades } from 'src/enfermedades/entities/enfermedade.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { DataSource } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class VisitasService {
  constructor(
    @InjectRepository(Visitas)
    private readonly visitasRepository: Repository<Visitas>,
    @InjectRepository(Persona) private readonly personRepo: Repository<Persona>,
    @InjectRepository(Medico) private readonly medicoRepo: Repository<Medico>,
    @InjectRepository(Enfermedades)
    private readonly enfermedadRepo: Repository<Enfermedades>,
    private readonly datasource: DataSource,
  ) {}

  async create(createVisitaDto: CreateVisitaDto) {
    const temp = this.visitasRepository.create(createVisitaDto);
    return await this.visitasRepository.save(temp);
  }

  async personaHistoria(personaHistoriaDto: PersonaHistoriaDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let person = await this.personRepo.findOneBy({
      identificacion: personaHistoriaDto.user.identificacion,
    });
    let medic = await this.medicoRepo.findOneBy({
      sacs: personaHistoriaDto.medic.sacs,
    });
    try {
      if (!person) {
        person = this.personRepo.create(personaHistoriaDto.user);
        await queryRunner.manager.save(person);
      }

      if (!medic) {
        medic = this.medicoRepo.create(personaHistoriaDto.medic);
        await queryRunner.manager.save(medic);
      }

      const temp = this.visitasRepository.create({
        ...personaHistoriaDto.historiaMedica,
        persona: person,
        medico: medic,
        enfermedades: <any>personaHistoriaDto.enfermedades,
      });

      await queryRunner.manager.save(temp);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return personaHistoriaDto.historiaMedica;
  }

  findAll(): object {
    return this.visitasRepository.find();
  }

  findOne(id: number) {
    return this.visitasRepository.findOneBy({ id: id });
  }

  async update(id: number, updateVisitaDto: UpdateVisitaDto) {
    const toUpdate = await this.visitasRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updateVisitaDto);
    return await this.visitasRepository.save(updated);
  }

  remove(id: number) {
    return this.visitasRepository.delete({ id: id });
  }

  async countVisits(): Promise<object> {
    const x = await this.visitasRepository.find();
    return { result: x.length };
  }
  async orderByMonth(dateMonth: Date) {
    const rightNow = moment().format('YYYY');
    const entity = this.visitasRepository.createQueryBuilder('i');
    if (dateMonth) {
      entity.andWhere('extract(month from "fechaVisita") = :dateMonth', {
        dateMonth,
      });
      entity.andWhere('extract(year from "fechaVisita") = :rightNow', {
        rightNow,
      });
    }
    //console.log(' se accedio aqui con el parametro: ', dateMonth);
    return await entity.getMany();
  }

  async orderByGender() {
    //'SELECT persona.genero, COUNT(*) as count FROM visitas INNER JOIN persona ON visitas."personaId" = persona.id GROUP BY persona.genero', esto es lo que quiero
    // 'SELECT persona.genero, COUNT(*) as count FROM visitas INNER JOIN persona ON visitas."personaId" = persona.id WHERE EXTRACT(YEAR FROM "fechaVisita") = EXTRACT(YEAR FROM CURRENT_DATE) GROUP BY persona.genero',
    // ordenar por generos y solamente traer los registros del mes actual
    return this.visitasRepository.query(`
    SELECT persona.genero, COUNT(*) as count
      FROM visitas
      INNER JOIN persona ON visitas."personaId" = persona.id
      WHERE EXTRACT(YEAR FROM "fechaVisita") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY persona.genero;
    `);
  }
  async orderByAge() {
    return this.visitasRepository.query(`
    SELECT 
    CASE 
        WHEN DATE_PART('year', AGE(NOW(), persona."fechaNacimiento")) > 18 THEN 'Mayores de edad'
        ELSE 'Menores de edad'
    END as age_group,
    COUNT(*) as count
FROM visitas
INNER JOIN persona ON visitas."personaId" = persona.id
GROUP BY age_group;
  `);
  }
  /*
  para contar los mayores `
    SELECT visitas.*
    FROM visitas
    INNER JOIN persona ON visitas."personaId" = persona.id
    WHERE DATE_PART('year', AGE(NOW(), persona."fechaNacimiento")) > 18;
  `*/
  async allMonths() {
    return await this.visitasRepository.query(`
      SELECT EXTRACT (MONTH FROM ("fechaVisita")) AS Mes, COUNT(*) AS TotalRegistros
      FROM visitas
      WHERE EXTRACT(YEAR FROM "fechaVisita") = EXTRACT(YEAR FROM CURRENT_DATE) 
      GROUP BY EXTRACT (MONTH FROM ("fechaVisita"))
      ORDER BY EXTRACT (MONTH FROM("fechaVisita") );
    `);
  }
  async orderByMost() {
    return await this.visitasRepository.query(`
    SELECT enfermedades."nombreEnfermedad", COUNT(enfermedades."nombreEnfermedad")
    FROM visitas
    LEFT JOIN enfermedades ON visitas."enfermedadesId" = enfermedades.id
    WHERE EXTRACT(YEAR FROM "fechaVisita") = EXTRACT(YEAR FROM CURRENT_DATE) 
    GROUP BY enfermedades."nombreEnfermedad"
  `);
  }
}
/*const repetidos = {};
    result.forEach(function (valor) {
      repetidos[valor] = (repetidos[valor] || 0) + 1;
    }); */
