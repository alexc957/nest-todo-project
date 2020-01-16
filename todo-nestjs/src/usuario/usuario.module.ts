import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [],
  exports: [],
})

export  class UsuarioModule {
  
}
