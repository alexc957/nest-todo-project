import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEntity } from './estado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadoEntity], 'proyectoWeb'),
  ],
  controllers: [EstadoController],
  providers: [],
  exports: [],
  
})
export  class EstadoModule {

}
