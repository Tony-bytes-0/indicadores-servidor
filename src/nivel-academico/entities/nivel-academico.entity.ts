import { Medico } from 'src/medico/entities/medico.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class NivelAcademico extends BaseEntity {
  @Column({ type: 'varchar' })
  nivelAcademico: string;
  @ManyToOne(() => Medico, (medico) => medico.nivelAcademico)
  medico: Medico;
}
