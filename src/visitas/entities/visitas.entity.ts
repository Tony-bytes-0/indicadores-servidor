import { Enfermedades } from 'src/enfermedades/entities/enfermedade.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Visitas extends BaseEntity {
  @Column({ type: 'varchar' })
  altura: string; //medical record data
  @Column({ type: 'varchar' })
  peso: string;
  @Column({ type: 'varchar' })
  temperatura: string;
  @Column({ type: 'varchar' })
  tensionSistolica: string;
  @Column({ type: 'varchar' })
  tensionDiastolica: string;
  @Column({ type: 'date' })
  fechaVisita: Date;
  @Column({ type: 'varchar' })
  observaciones: string;
  @ManyToOne(() => Persona, (persona) => persona.id, { eager: true })
  @JoinColumn()
  persona: Persona;
  @ManyToOne(() => Medico, (medico) => medico.sacs, { eager: true })
  @JoinColumn()
  medico: Medico;
  @ManyToOne(() => Enfermedades, (enfermedades) => enfermedades.id, {
    eager: true,
  })
  @JoinColumn()
  enfermedades: Medico;
}
