import { Injectable } from '@nestjs/common';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelAcademico } from './entities/nivel-academico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelAcademicoService {
  constructor(
    @InjectRepository(NivelAcademico)
    private readonly nivelAcademicoRepo: Repository<NivelAcademico>,
  ) {}
  async create(createNivelAcademicoDto: CreateNivelAcademicoDto) {
    const temp = this.nivelAcademicoRepo.create(createNivelAcademicoDto);
    return await this.nivelAcademicoRepo.save(temp);
  }

  findAll() {
    return this.nivelAcademicoRepo.find();
  }

  async update(id: number, createNivelAcademicoDto: CreateNivelAcademicoDto) {
    const toUpdate = await this.nivelAcademicoRepo.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, createNivelAcademicoDto);
    return await this.nivelAcademicoRepo.save(updated);
  }

  remove(id: number) {
    return this.nivelAcademicoRepo.delete({ id: id });
  }
}
