import { Injectable } from '@nestjs/common';
//import { CreateLocalidadDto } from './dto/create-localidad.dto';
//import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from './entities/localidad.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocalidadService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepo: Repository<Localidad>,
  ) {}
  async create(createLocalidadDto: object) {
    const temp = this.localidadRepo.create(createLocalidadDto);
    return await this.localidadRepo.save(temp);
  }

  findAll(): object {
    return this.localidadRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} localidad`;
  }

  /*   update(id: number, updateLocalidadDto: UpdateLocalidadDto) {
    return `This action updates a #${id} localidad`;
  } */

  remove(id: number) {
    return `This action removes a #${id} localidad`;
  }
}
