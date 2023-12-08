import { Injectable } from '@nestjs/common';
import { CreateHistoriaMedicaDto } from './dto/create-historia-medica.dto';
import { UpdateHistoriaMedicaDto } from './dto/update-historia-medica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriaMedica } from './entities/historia-medica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoriaMedicaService {
  constructor(
    @InjectRepository(HistoriaMedica)
    private readonly historiaRepository: Repository<HistoriaMedica>,
  ) {}
  async create(createHistoriaMedicaDto: CreateHistoriaMedicaDto) {
    const temp = this.historiaRepository.create(createHistoriaMedicaDto);
    return await this.historiaRepository.save(temp);
  }

  findAll(): object {
    return this.historiaRepository.find();
  }

  findOne(id: number) {
    return this.historiaRepository.findOneBy({ id: id });
  }

  async update(id: number, updateHistoriaMedicaDto: UpdateHistoriaMedicaDto) {
    const toUpdate = await this.historiaRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updateHistoriaMedicaDto);
    return await this.historiaRepository.save(updated);
  }

  remove(id: number) {
    return this.historiaRepository.delete({ id: id });
  }
}
