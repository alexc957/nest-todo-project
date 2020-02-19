import { Body, Controller, Get, Post, Query, Req, Res, Session } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioCreateDto } from './usuario.create-dto';
import { validate } from 'class-validator';
import { UsuarioService } from './usuario.service';

@Controller('usuario')

export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {
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

  @Get('ruta/signUp')
  signUpRuta(
    @Res() res,
    @Session() session,
    @Query('errores') errores: string,
  ) {

    res.render('usuario/rutas/signUp', {
      datos : {
        errores,
        usuario: session.user
      },
    });

  }

  @Get('ruta/login')
  loginRuta(
    @Res() res,
    @Session() session,
    @Query('errores') errores: string,
  ) {

    res.render('usuario/rutas/login', {
      datos: {
        errores,
        usuario: session.user,
      },
    });

  }

  @Post('login')
  async login(
    @Body('correo') correo: string,
    @Body('passwordHash') passwordHash: string,
    @Res() res,
    @Session() session,
  ) {
    const usuarios = await this.usuarioService.search({correo: correo});
    if ( usuarios.length > 0) {
      if (usuarios[0].passwordHash === passwordHash) {
        session.user = usuarios[0];
        res.redirect('/tarea/ruta/mostrar-tareas')
      } else {
        res.redirect('/usuario/ruta/login?errores=bad credentials');
      }
    } else {
      res.redirect('/usuario/ruta/login?errores=bad credentials');
    }


  }




  @Post('signUp')
  async signUp(
    @Session() session,
    @Res() res,
    @Body() usuario: UsuarioEntity,
  ) {
    console.log('llegue aqui ', usuario)
    try {
      const usuarioDto = new UsuarioCreateDto();
      usuarioDto.nombre = usuario.nombre;
      usuarioDto.apellido = usuario.apellido;
      usuarioDto.correo = usuario.correo;
      usuarioDto.passwordHash = usuario.passwordHash;
      console.log(usuario);
      const errores = await validate(usuarioDto);
      if (errores.length > 0) {
        console.log(errores);
        res.redirect('/usuario/ruta/signUp?errores=error validando');
      } else {
        await this.usuarioService.saveOne(usuario);
        res.redirect('/tarea/ruta/mostrar-tareas');
      }
    } catch (e) {
      res.redirect('/usuario/ruta/signUp?errores=error validando');
    }

 }

 @Get('logout')
  logout(
    @Session() session,
    @Req() req,
    @Res() res,
 ) {
    session.user = undefined;
    req.session.destroy();

    res.redirect('/usuario/ruta/login')

 }
 @Get('ruta/cuenta')
 cuenta(
   @Session() session,
   @Res() res,
 ) {
    if (session.user) {
      res.render('usuario/rutas/cuenta',{
        datos: {
          usuario: session.user,
        },
      });
    } else {
      res.redirect('/usuario/ruta/login');
    }
 }

}
