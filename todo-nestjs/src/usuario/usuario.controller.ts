import { Controller, Get } from '@nestjs/common';

@Controller('usuario')

export class UsuarioController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'usuario: it works';
  }

}
