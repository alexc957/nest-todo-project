import { Controller, Get } from '@nestjs/common';

@Controller('estado')
export class EstadoController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'estado: it works';
  }

}
