import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { type } from 'os';
import { EstadoEntity } from '../estado/estado.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('tarea')
export  class TareaEntity {

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
    name: 'descripcion',
    default: ' ',
  })
  descripcion: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'fecha_inicio',
  })
  fechaInicio: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'fecha_fin',
  })
  fechaFin: string;

  // tslint:disable-next-line:no-shadowed-variable
  @ManyToOne(type => UsuarioEntity, usuario => usuario.tareas)
  usuario: UsuarioEntity;
  // tslint:disable-next-line:no-shadowed-variable
  @OneToOne(type => EstadoEntity)
  @JoinColumn()
  estado: EstadoEntity;

  // tslint:disable-next-line:no-shadowed-variable
  @ManyToMany(type => TagEntity,tag => tag.tareas, {
    cascade: true,
  })
  @JoinTable()
  tags: TagEntity[];


}
