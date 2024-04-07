import { Medico } from 'src/medico/entities/medico.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class NivelAcademico extends BaseEntity {
  @Column({ type: 'varchar' })
  nivelAcademico: string;
  @OneToMany(() => Medico, (medico) => medico.nivelAcademico)
  medico: Medico[];
}
