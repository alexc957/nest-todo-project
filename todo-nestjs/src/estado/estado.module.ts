import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEntity } from './estado.entity';
import { EstadoService } from './estado.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadoEntity], ),
  ],
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService],
})
export  class EstadoModule {

}
