import { BaseEntity } from 'src/shared/entities/base.entity';
import { Visitas } from 'src/visitas/entities/visitas.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Medico extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  sacs: string;
  @Column({ type: 'varchar' })
  nombreMedico: string;
  @Column({ type: 'varchar' })
  especialidad: string;
  @OneToMany(() => Visitas, (visitas) => visitas.medico)
  visitas: Visitas;
}
