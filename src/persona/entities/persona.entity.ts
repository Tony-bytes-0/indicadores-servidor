import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { gender } from '../enum/genero.enum';
import { HistoriaMedica } from 'src/historia-medica/entities/historia-medica.entity';

@Entity()
export class Persona extends BaseEntity {
  @Column({ type: 'varchar' })
  nombre: string;
  @Column({ type: 'varchar' })
  apellido: string;
  @Column({ type: 'varchar' })
  identificacion: string;
  @Column({ type: 'date' })
  fechaNacimiento: Date;
  @Column({ type: 'varchar' })
  direccion: string;
  @Column({ type: 'varchar' })
  tipoSangre: string;
  @Column({ type: 'enum', enum: gender })
  genero: gender;
  @Column({ type: 'varchar' })
  telefono: string;
  @Column({ type: 'varchar' })
  telefonoEmergencia: string;
  @OneToOne(() => HistoriaMedica, (historiaMedica) => historiaMedica.persona)
  historiaMedica: HistoriaMedica;
}
