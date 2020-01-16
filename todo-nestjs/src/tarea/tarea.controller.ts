import { Controller, Get } from '@nestjs/common';

@Controller('tarea')

export class TareaController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'tarea it works';
  }

}
