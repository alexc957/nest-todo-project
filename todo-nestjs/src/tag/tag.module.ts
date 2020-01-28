import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaEntity } from '../tarea/tarea.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TareaEntity], )
  ],
  controllers: [TagController],
  providers: [],
  exports: []
})

export class TagModule {}
