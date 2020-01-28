import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { EstadoModule } from './estado/estado.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { UsuarioService } from './usuario/usuario.service';
import { TareaEntity } from './tarea/tarea.entity';
import { EstadoEntity } from './estado/estado.entity';
import { TagEntity } from './tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      dropSchema: false,
      database: 'tododb',
      entities: [
        UsuarioEntity,
        TareaEntity,
        EstadoEntity,
        TagEntity,
      ],
      synchronize: true,
    }),
    UsuarioModule,
    TareaModule,
    EstadoModule,
    TagModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
