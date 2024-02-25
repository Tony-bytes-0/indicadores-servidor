import { Injectable } from '@nestjs/common';
import { CreateEnfermedadeDto } from './dto/create-enfermedade.dto';
//import { UpdateEnfermedadeDto } from './dto/update-enfermedade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enfermedades } from './entities/enfermedade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnfermedadesService {
  constructor(
    @InjectRepository(Enfermedades)
    private readonly EnfermedadesRepository: Repository<Enfermedades>,
  ) {}
  async create(createEnfermedadeDto: CreateEnfermedadeDto) {
    const temp = this.EnfermedadesRepository.create(createEnfermedadeDto);
    return await this.EnfermedadesRepository.save(temp);
  }

  findAll(): object {
    return this.EnfermedadesRepository.find();
  }

  findOne() {
    return 'patata'; //this.EnfermedadesRepository.find({ id: id });
  }

  /*   update(id: number, updateEnfermedadeDto: UpdateEnfermedadeDto) {
    return `This action updates a #${id} enfermedade`;
  } */

  remove(id: number) {
    return this.EnfermedadesRepository.delete({ id: id });
  }
}
