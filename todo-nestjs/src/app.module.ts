import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { EstadoModule } from './estado/estado.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsuarioModule,
    TareaModule,
    EstadoModule,
    TagModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      database: 'tododb',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
