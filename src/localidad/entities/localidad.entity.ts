import { Persona } from 'src/persona/entities/persona.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Localidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombreLocalidad: string;

  @OneToMany(() => Persona, (persona) => persona.localidad)
  persona: Persona;
}
