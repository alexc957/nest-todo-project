import { Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaEntity } from './tarea.entity';
import { EstadoService } from '../estado/estado.service';
import { TagService } from '../tag/tag.service';
import { EstadoEntity } from '../estado/estado.entity';
import { TagEntity } from '../tag/tag.entity';
import { TareaCreateDto } from './tarea.create-dto';
import { validate } from 'class-validator';
import { Like } from 'typeorm';

@Controller('tarea')

export class TareaController {
  constructor(
    private readonly tareaService: TareaService,
    private readonly estadoService: EstadoService,
    private readonly tagService: TagService,
  ) {
  }

  @Get('test')
  test() {
    return 'tarea it works';
  }


  @Get('ruta/mostrar-tareas')
  async mostrarTareas(
    @Res() res,
    @Session() session,
    @Query('mensaje') mensaje: string,
    @Query('error') error: string,
    @Query('tareaEstado') tareaEstado: string,
    @Query('nombreConsulta') nombreConsulta: string,

  ) {
    if (session.user) {
      let consultaWhereLike;
      if (tareaEstado) {
        const estadoConsulta = this.estadoService.buscar({nombreEstado: tareaEstado});
        console.log('estado consulta', estadoConsulta);
        consultaWhereLike = {
          estadoNombre: Like('%' + tareaEstado + '%'),
          usuario: session.user,
        };

      } else  if (nombreConsulta) {
        consultaWhereLike = {
          nombre: Like('%' + nombreConsulta + '%'),
          usuario: session.user,
        };
       } else {
        consultaWhereLike = {
          usuario: session.user,
        };
      }

      const tareas = await this.tareaService.search(consultaWhereLike);
      res.render('tarea/rutas/mostrar-tareas', {
        datos: {
          usuario: session.user,
          tareas,
          mensaje,
          error,
        },
      });
    } else {
      res.redirect('/usuario/ruta/login');
    }


  }

  @Get('ruta/nuevaTarea')
  nuevaTareaRuta(
    @Res() res,
    @Session() session,
    @Query('error') error: string,
  ) {
    if (session.user) {
      res.render('tarea/rutas/crear-tarea', {
        datos: {
          usuario: session.user,
          error,
        },
      });
    }
  }
  @Post('guardar/:id')
  async actualizarTarea(
    @Session() session,
    @Body() tarea,
    @Res() res,
    @Param('id') id: string,
  ) {
    try {
      console.log('tarea? ', tarea);
      const tareaEntity = new TareaEntity();
      tareaEntity.id = +id;
      tareaEntity.nombre = tarea.nombre;
      tareaEntity.estadoNombre = tarea.estado;
      tareaEntity.descripcion = tarea.descripcion;
      tareaEntity.fechaInicio = new Date(tarea.fechaInicio).toDateString();
      tareaEntity.fechaFin = new Date(tarea.fechaFin).toDateString();
      tareaEntity.usuario = session.user;

      const tareaCreateDto = new TareaCreateDto();
      tareaCreateDto.nombre = tareaEntity.nombre;
      tareaCreateDto.descripcion = tareaEntity.descripcion;
      tareaCreateDto.fechaInicio = tareaEntity.fechaInicio;
      tareaCreateDto.fechaFin = tareaEntity.fechaFin;
      tareaCreateDto.estadoNombre = tareaEntity.estadoNombre;

      const fechaInicio = new Date(tarea.fechaInicio);
      const fechaFin = new Date(tarea.fechaFin);
      const errores = await validate(tareaCreateDto);
      // @ts-ignore
      const fechaValida = fechaFin - fechaInicio;
      if  (errores.length === 0 && fechaValida > 0) {
        await this.tareaService.saveOne(tareaEntity);
        res.redirect('/tarea/ruta/mostrar-tareas?mensaje=se ha actualizado con exito');
      } else {
        console.log('errores', errores);
        res.redirect('/tarea/ruta/editar/' + id + '?error=error al actualizar o campos vacios');
      }

    } catch (e) {
      res.redirect('/tarea/ruta/editar/' + id + '?error=error al validar o campos vacios');

    }

  }



  @Post('guardar')
  async guardarTarea(
    @Body() tarea,
    @Session() session,
    @Res() res,
  ) {
    try {
      console.log('tarea? ', tarea);
      const tareaEntity = new TareaEntity();

      tareaEntity.nombre = tarea.nombre;
      tareaEntity.descripcion = tarea.descripcion;
      tareaEntity.fechaInicio = new Date(tarea.fechaInicio).toDateString();
      tareaEntity.fechaFin = new Date(tarea.fechaFin).toDateString();
      tareaEntity.estadoNombre = tarea.estado;
      tareaEntity.actualTags = tarea.tags;
      tareaEntity.usuario = session.user;

      const tareaCreateDto = new TareaCreateDto();
      tareaCreateDto.nombre = tareaEntity.nombre;
      tareaCreateDto.descripcion = tareaEntity.descripcion;
      tareaCreateDto.fechaInicio = tareaEntity.fechaInicio;
      tareaCreateDto.fechaFin = tareaEntity.fechaFin;
      tareaCreateDto.estadoNombre = tareaEntity.estadoNombre;
      const fechaInicio = new Date(tarea.fechaInicio);
      const fechaFin = new Date(tarea.fechaFin);
      const errores = await validate(tareaCreateDto);
      // @ts-ignore
      const fechaValida = fechaFin - fechaInicio;
      if  (errores.length === 0 && fechaValida > 0) {
        await this.tareaService.saveOne(tareaEntity);
        res.redirect('/tarea/ruta/mostrar-tareas?mensaje=se ha ingresado con exito');
      } else {
        console.log('errores? ', errores);
        console.log('fechaValida ', fechaValida);
        res.redirect('/tarea/ruta/nuevaTarea?error=error al validar o campos vacios');
      }

            /*
      tags.forEach(async (tag) => {
        const newTag = new TagEntity();
        newTag.tagNombre = tag;
        await this.tagService.guardarUno(newTag)

      })
      */
    } catch (e) {
      console.log('error try catch', e);
      res.redirect('/tarea/ruta/nuevaTarea?error=error al validar o campos vacios');

    }

  }

  @Get('ruta/verTarea')
  async verTarea(
    @Session() session,
    @Res() res,
    @Query('idTarea') idTarea: string,
  ) {
    try {
      const tareaActual = await this.tareaService.getOne(+idTarea);
      const estado = await this.estadoService.buscar({tarea: tareaActual});
      console.log(estado);
      res.render('tarea/rutas/ver-tarea', {
        datos: {
          usuario: session.user,
          tarea: tareaActual,
          estado: estado[0].nombreEstado
        },
      });
    } catch (e) {
      console.log(e);

    }
  }

  @Post('eliminar/:id')
  async eliminarTarea(
    @Session() session,
    @Res() res,
    @Param('id') id: string,
  )  {
    try {
      await this.tareaService.deleteOne(+id);
      res.redirect('/tarea/ruta/mostrar-tareas?mensaje=se ha eliminado una tarea');
    } catch (e) {
      res.redirect('/tarea/ruta/nuevaTarea?error=error al eliminar');

    }
  }

  @Get('ruta/editar/:id')
  async rutaEditarTarea(
    @Session() session,
    @Param('id') id: string,
    @Res() res,
    @Query('error') error: string,

  ) {
    try {
      const tarea = await this.tareaService.getOne(+id);
      // const tagsDeEstaTarea = await tarea.tags;
      // console.log('tarea', tarea);
     // console.log('estas son las verdaderas tareas? ', tagsDeEstaTarea);
      // const tags = tarea.tags;
      // console.log('tags', tags);
      // const tagsEntities = await  this.tagService.buscar({tareas: [tarea]});
    //  const actualTags = await this.tareaService.getTags(['tags'], { tarea });
      // console.log('actual tags ', actualTags);

      // const stringTags = [];
      /* tagsEntities.forEach((tagName) => {
        stringTags.push(tagName.tagNombre);
      }); */
      // const tagsNames = stringTags.join();
      // const estadoActual = await this.estadoService.buscar({tarea});


      console.log(new Date(tarea.fechaInicio).toISOString().split('T')[0]);
      res.render(
        'tarea/rutas/crear-tarea', {
          datos: {
            tarea,
            usuario: session.user,
            error,
            id,
            tagsNames: tarea.actualTags,
            estado: tarea.estadoNombre,
          },
        },
      );
    } catch (e) {
      console.log(e);
      res.redirect('/tarea/ruta/mostrar-tareas?error=error al obtener la tarea del servidor');    }
  }


}
