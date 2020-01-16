import { Controller, Get } from '@nestjs/common';

@Controller('tag')
export class TagController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'tag: it works'
  }
}
