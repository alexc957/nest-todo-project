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

  getOne() {
    return 'it works ';
  }


}
