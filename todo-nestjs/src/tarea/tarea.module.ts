import { Module } from '@nestjs/common';
import { TareaController } from './tarea.controller';

@Module({
  imports: [],
  controllers: [TareaController],
  providers: [],
  exports: [],

})

export  class TareaModule {


}
