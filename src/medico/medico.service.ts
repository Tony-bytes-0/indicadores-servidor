import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}
  async create(createMedicoDto: CreateMedicoDto) {
    const find = await this.medicoRepository.findOneBy({
      sacs: createMedicoDto.sacs,
    });
    if (find) {
      const toUpdate = await this.medicoRepository.findOne({
        where: { id: find.id },
      });
      const updated = Object.assign(toUpdate, createMedicoDto);
      return await this.medicoRepository.save(updated);
    } else {
      const temp = this.medicoRepository.create(createMedicoDto);
      return await this.medicoRepository.save(temp);
    }
  }

  async nivelAcademico() {
    return this.medicoRepository.query(`
    SELECT "nivel_academico"."nivelAcademico" as "nivelAcademico", COUNT("nivel_academico"."nivelAcademico") as count
    FROM medico
    JOIN "nivel_academico" ON medico."nivelAcademicoId" = "nivel_academico".id
    GROUP BY "nivel_academico"."nivelAcademico"
    ORDER BY count DESC;
    `);
  }

  findAll(): object {
    return this.medicoRepository.find();
  }

  findOne(id: number) {
    return this.medicoRepository.findOneBy({ id: id });
  }

  findBySacs(sacs: string) {
    return this.medicoRepository.findOneBy({ sacs: sacs });
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto) {
    const toUpdate = await this.medicoRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updateMedicoDto);
    return await this.medicoRepository.save(updated);
  }

  remove(id: number) {
    return this.medicoRepository.delete({ id: id });
  }
}
