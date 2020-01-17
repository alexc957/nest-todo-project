import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

}
