import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    // @InjectRepository(UsuarioEntity) private repositorioUsuario: Repository<UsuarioEntity>,
  ) {  }

  getOne(id) {
    //return this.repositorioUsuario.findOne(id);
    return '';
  }

}
