import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaEntity } from '../tarea/tarea.entity';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagEntity] )
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})

export class TagModule {}
