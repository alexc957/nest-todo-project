import { Controller, Get, Res, Session } from '@nestjs/common';

@Controller('tarea')

export class TareaController {
  constructor() {
  }

  @Get('test')
  test() {
    return 'tarea it works';
  }


  @Get('ruta/mostrar-tareas')
  mostrarTareas(
    @Res() res,
    @Session() session,

  ) {
    if (session.user) {

      res.render('tarea/rutas/mostrar-tareas', {
        datos: {
          usuario: session.user,
        },
      });
    } else {
      res.redirect('/usuario/ruta/login');
    }


  }

}
