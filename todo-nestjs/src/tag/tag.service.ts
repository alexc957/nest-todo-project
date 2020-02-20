import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TareaEntity } from '../tarea/tarea.entity';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity) private repositorioTag: Repository<TagEntity>
  ) {
  }

  guardarUno(tag) {
    return this.repositorioTag.save(tag);
  }

  buscar(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.repositorioTag.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1,
      },

    );
  }
}
