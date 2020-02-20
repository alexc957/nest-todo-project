import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEntity } from './estado.entity';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(EstadoEntity) private repositorioEstado: Repository<EstadoEntity>
  ) {
  }

  guardarUno(estado) {
    return this.repositorioEstado.save(estado);
  }


  buscar(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.repositorioEstado.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1,
      },

    );
  }


}
