import { Injectable } from '@nestjs/common';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { PersonaHistoriaDto } from './dto/persona-historia-dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitas } from './entities/visitas.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class VisitasService {
  constructor(
    @InjectRepository(Visitas)
    private readonly visitasRepository: Repository<Visitas>,
    @InjectRepository(Persona) private readonly personRepo: Repository<Persona>,
    @InjectRepository(Medico) private readonly medicoRepo: Repository<Medico>,
    private readonly datasource: DataSource,
  ) {}

  async create(createVisitaDto: CreateVisitaDto) {
    const temp = this.visitasRepository.create(createVisitaDto);
    return await this.visitasRepository.save(temp);
  }

  async personaHistoria(personaHistoriaDto: PersonaHistoriaDto) {
    console.log('mostrando el objeto en el servidor: ', personaHistoriaDto);
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
    console.log(person);

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

  async orderByMost() {
    const result = [];
    const x = await this.visitasRepository.find();
    console.log(x[0].enfermedades);
    for (let i = 0; i < x.length; i++) {
      result.push(x[i].enfermedades.id);
    }
    const repetidos = {};

    result.forEach(function (valor) {
      repetidos[valor] = (repetidos[valor] || 0) + 1;
    });

    return repetidos;
  }
}
