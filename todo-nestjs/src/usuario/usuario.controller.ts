import { Controller, Get, Res } from '@nestjs/common';

@Controller('usuario')

export class UsuarioController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'usuario: it works';
  }

  @Get('ruta/principal')
  principal(
    @Res() res,
  ) {
    res.render('usuario/rutas/principal')
  }

}
