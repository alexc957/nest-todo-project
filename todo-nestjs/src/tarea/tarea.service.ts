import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TareaEntity } from './tarea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(TareaEntity) private repositorioTarea: Repository<TareaEntity>,
  ) {
  }

  getOne(id: number) {
    return this.repositorioTarea.findOne(id);
  }

  saveOne(tarea) {
    return this.repositorioTarea.save(tarea);
  }

  deleteOne(id: number) {
    return this.repositorioTarea.delete(id);
  }

  getTags(
    relations1: any = [],
    whereNormal: any = {},
  ) {
      this.repositorioTarea.findOne({
        relations: relations1,
        where: whereNormal,
      })
  }




  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.repositorioTarea.find({
      where: whereNormal,
      take: take1,
      skip: skip1,
      order: order1,
    });
  }

}
