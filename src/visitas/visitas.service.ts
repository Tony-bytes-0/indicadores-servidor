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
    if (!person) {
      person = this.personRepo.create(personaHistoriaDto.user);
    }
    if (!medic) {
      medic = this.medicoRepo.create(personaHistoriaDto.medic);
    }

    const temp = this.visitasRepository.create({
      ...personaHistoriaDto.historiaMedica,
      persona: person,
      medico: medic,
      enfermedades: <any>1,
    });

    try {
      await queryRunner.manager.save(person);
      await queryRunner.manager.save(medic);
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

  async allMonths() {
    const rightNow = moment().format('YYYY');
    const entity = this.visitasRepository.createQueryBuilder('i');
    const meses = [];
    for (let i = 1; i < 13; i++) {
      if (i) {
        entity.andWhere('extract(month from "fechaVisita") = : i', { i });
        entity.where('extract(year from "fechaVisita") = :rightNow', {
          rightNow,
        });
        meses.push((await entity.getMany()).length);
        console.log('llevo: ', (await entity.getMany()).length);
      }
    }
    console.log('este es el tesultado: ', meses);
  }
  async orderByMost() {
    const result = [];
    const x = await this.visitasRepository.find();
    for (let i = 0; i < x.length; i++) {
      result.push(x[i].enfermedades.id);
    }
    const enfList = await this.enfermedadRepo.find();
    const z = result.map((e) => {
      for (let i = 0; i < enfList.length; i++) {
        if (e == enfList[i].id) {
          return enfList[i].nombreEnfermedad;
        }
      }
    });
    const repetidos = {};
    z.forEach(function (valor) {
      repetidos[valor] = (repetidos[valor] || 0) + 1;
    });

    return repetidos;
  }
}
/*const repetidos = {};
    result.forEach(function (valor) {
      repetidos[valor] = (repetidos[valor] || 0) + 1;
    }); */
