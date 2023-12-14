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
    const temp = this.medicoRepository.create(createMedicoDto);
    return await this.medicoRepository.save(temp);
  }

  findAll(): object {
    return this.medicoRepository.find();
  }

  findOne(id: number) {
    return this.medicoRepository.findOneBy({ id: id });
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
