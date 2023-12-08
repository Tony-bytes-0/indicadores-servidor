import { Persona } from 'src/persona/entities/persona.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class HistoriaMedica extends BaseEntity {
  @Column({ type: 'varchar' })
  altura: string;
  @Column({ type: 'varchar' })
  peso: string;
  @Column({ type: 'varchar' })
  temperatura: string;
  @Column({ type: 'varchar' })
  tensionSistolica: string;
  @Column({ type: 'varchar' })
  tensionDiastolica: string;
  @Column({ type: 'date' })
  fechaRevision: Date;
  @OneToOne(() => Persona, (persona) => persona.historiaMedica, { eager: true })
  @JoinColumn()
  persona: Persona;
}
