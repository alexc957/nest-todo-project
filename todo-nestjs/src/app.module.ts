import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { EstadoModule } from './estado/estado.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    UsuarioModule,
    TareaModule,
    EstadoModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
