import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TareaEntity } from '../tarea/tarea.entity';

@Entity('tag')
export class TagEntity {

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
    name: 'nombre_tag'
  })
  tagNombre: string;

  /* @ManyToMany(type => TareaEntity, tarea => tarea.tags)
  tareas: TareaEntity[]; */

}
