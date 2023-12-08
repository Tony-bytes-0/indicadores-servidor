import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Enfermedades extends BaseEntity {
  @Column({ type: 'varchar' })
  nombreEnfermedad: string;
}
