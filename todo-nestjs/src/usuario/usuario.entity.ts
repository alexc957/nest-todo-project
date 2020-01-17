import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TareaEntity } from '../tarea/tarea.entity';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'

  })
  id: number;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'nombre'
  })
  nombre: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'apellido'
  })
  apellido: string;

  @Index({
    unique: true,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'correo',
      })
  correo: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password_hash'
  })
  passwordHash: string;

  @OneToMany(type => TareaEntity, tarea => tarea.usuario)
  tareas: TareaEntity[]
}
