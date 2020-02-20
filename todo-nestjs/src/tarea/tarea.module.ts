import { Module } from '@nestjs/common';
import { TareaController } from './tarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaEntity } from './tarea.entity';
import { TareaService } from './tarea.service';
import { TagService } from '../tag/tag.service';
import { EstadoService } from '../estado/estado.service';
import { TagEntity } from '../tag/tag.entity';
import { EstadoEntity } from '../estado/estado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TareaEntity] ),
    TypeOrmModule.forFeature([TagEntity] ),
    TypeOrmModule.forFeature([EstadoEntity]),
  ],
  controllers: [TareaController],
  providers: [
    TareaService,
    TagService,
    EstadoService,
  ],
  exports: [ TareaService ],

})

export  class TareaModule {


}
