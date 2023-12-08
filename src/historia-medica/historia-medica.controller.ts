import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoriaMedicaService } from './historia-medica.service';
import { CreateHistoriaMedicaDto } from './dto/create-historia-medica.dto';
import { UpdateHistoriaMedicaDto } from './dto/update-historia-medica.dto';

@Controller('historia-medica')
export class HistoriaMedicaController {
  constructor(private readonly historiaMedicaService: HistoriaMedicaService) {}

  @Post()
  create(@Body() createHistoriaMedicaDto: CreateHistoriaMedicaDto) {
    return this.historiaMedicaService.create(createHistoriaMedicaDto);
  }

  @Get()
  findAll() {
    return this.historiaMedicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiaMedicaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoriaMedicaDto: UpdateHistoriaMedicaDto,
  ) {
    return this.historiaMedicaService.update(+id, updateHistoriaMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiaMedicaService.remove(+id);
  }
}
