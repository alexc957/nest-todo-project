import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TareaEntity } from '../tarea/tarea.entity';

@Entity('estado')
export  class EstadoEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'

  })
  id: number;

  @Index({
    unique: true,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'nombre_estado'
  })
  nombreEstado: string;

  /* @OneToOne(type => TareaEntity, tarea => tarea.estado) // specify inverse side as a second parameter
  tarea: TareaEntity; */
}
