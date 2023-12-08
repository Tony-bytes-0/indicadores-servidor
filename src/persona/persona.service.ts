import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private readonly personRepo: Repository<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto) {
    const tomamango = this.personRepo.create(createPersonaDto);
    return await this.personRepo.save(tomamango);
  }

  findAll(): object {
    return this.personRepo.find();
  }

  findOne(id: number) {
    return this.personRepo.findOneBy({ id: id });
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const toUpdate = await this.personRepo.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updatePersonaDto);
    return await this.personRepo.save(updated);
  }

  remove(id: number) {
    return this.personRepo.delete({ id: id });
  }
}
