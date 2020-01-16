import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [],
  exports: []
})

export class TagModule {}
