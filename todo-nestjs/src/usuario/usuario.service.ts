import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
     @InjectRepository(UsuarioEntity) private repositorioUsuario: Repository<UsuarioEntity>,
  ) {  }

  getOne(id) {
    return this.repositorioUsuario.findOne(id);
  }

  saveOne(usuario: UsuarioEntity) {
    return this.repositorioUsuario.save(usuario);
  }

  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.repositorioUsuario.find({
      where: whereNormal,
      take: take1,
      skip: skip1,
      order: order1,
    });
  }


}
