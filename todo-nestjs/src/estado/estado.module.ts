import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';

@Module({
  imports: [],
  controllers: [EstadoController],
  providers: [],
  exports: [],
  
})
export  class EstadoModule {

}
