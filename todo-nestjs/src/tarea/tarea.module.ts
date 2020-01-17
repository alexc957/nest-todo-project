import { Module } from '@nestjs/common';
import { TareaController } from './tarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaEntity } from './tarea.entity';
import { TareaService } from './tarea.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TareaEntity], 'proyectoWeb'),
  ],
  controllers: [TareaController],
  providers: [],
  exports: [],

})

export  class TareaModule {


}
