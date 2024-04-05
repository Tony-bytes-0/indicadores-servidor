import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NivelAcademicoService } from './nivel-academico.service';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';

@Controller('nivelAcademico')
export class NivelAcademicoController {
  constructor(private readonly nivelAcademicoService: NivelAcademicoService) {}

  @Post()
  create(@Body() createNivelAcademicoDto: CreateNivelAcademicoDto) {
    return this.nivelAcademicoService.create(createNivelAcademicoDto);
  }

  @Get()
  findAll() {
    return this.nivelAcademicoService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createNivelAcademicoDto: CreateNivelAcademicoDto,
  ) {
    return this.nivelAcademicoService.update(+id, createNivelAcademicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelAcademicoService.remove(+id);
  }
}
