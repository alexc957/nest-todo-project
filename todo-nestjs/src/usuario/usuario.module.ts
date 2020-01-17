import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UsuarioEntity], 'default)
  ],
  controllers: [UsuarioController],
  providers: [],
  exports: [],
})

export  class UsuarioModule {
  
}
