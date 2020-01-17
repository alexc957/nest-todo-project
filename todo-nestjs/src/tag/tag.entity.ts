import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

}
