import { Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaEntity } from './tarea.entity';
import { EstadoService } from '../estado/estado.service';
import { TagService } from '../tag/tag.service';
import { EstadoEntity } from '../estado/estado.entity';
import { TagEntity } from '../tag/tag.entity';

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
  ) {
    if (session.user) {
      const tareas = await this.tareaService.search({usuario: session.user});
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
      tareaEntity.descripcion = tarea.descripcion;
      tareaEntity.fechaInicio = new Date(tarea.fechaInicio).toDateString();
      tareaEntity.fechaFin = new Date(tarea.fechaFin).toDateString();
      const estadoActual = await this.estadoService.buscar({
        nombreEstado: tarea.estado,
      });
      if (estadoActual.length === 0) {
        const estadoNuevo = new EstadoEntity();
        estadoNuevo.nombreEstado = tarea.estado;
        await this.estadoService.guardarUno(estadoNuevo);
        tareaEntity.estado = estadoNuevo;
      } else {
        tareaEntity.estado = estadoActual[0];
      }

      const tags = tarea.tags.split(',');
      const tagsToSave = [];

      for (const tagN of tags) {
        console.log('tagN? ', tagN);
        const tagActual = await this.tagService.buscar({tagNombre: tagN});
        console.log('tag Actual? ', tagActual);
        if (tagActual.length === 0) {
          const newTag = new TagEntity();

          newTag.tagNombre = tagN;
          await this.tagService.guardarUno(newTag);
          tagsToSave.push(newTag);
        } else {
          tagsToSave.push(tagActual[0]);
        }
      }
      console.log('estado ', tareaEntity.estado);
      console.log('tags to save', tagsToSave);
      tareaEntity.tags = tagsToSave;
      tareaEntity.usuario = session.user;
      await this.tareaService.saveOne(tareaEntity);
      /*
      tags.forEach(async (tag) => {
        const newTag = new TagEntity();
        newTag.tagNombre = tag;
        await this.tagService.guardarUno(newTag)

      })
      */

      res.redirect('/tarea/ruta/mostrar-tareas?mensaje=se ha actualizdo con exito');
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
      const estadoActual = await this.estadoService.buscar({
        nombreEstado: tarea.estado,
      });
      if (estadoActual.length === 0) {
        const estadoNuevo = new EstadoEntity();
        estadoNuevo.nombreEstado = tarea.estado;
        await this.estadoService.guardarUno(estadoNuevo);
        tareaEntity.estado = estadoNuevo;
      } else {
        tareaEntity.estado = estadoActual[0];
      }

      const tags = tarea.tags.split(',');
      const tagsToSave = [];

      for (const tagN of tags) {
        console.log('tagN? ', tagN);
        const tagActual = await this.tagService.buscar({tagNombre: tagN});
        console.log('tag Actual? ', tagActual);
        if (tagActual.length === 0) {
          const newTag = new TagEntity();

          newTag.tagNombre = tagN;
          await this.tagService.guardarUno(newTag);
          tagsToSave.push(newTag);
        } else {
          tagsToSave.push(tagActual[0]);
        }
      }
      console.log('estado ', tareaEntity.estado);
      console.log('tags to save', tagsToSave);
      tareaEntity.tags = tagsToSave;
      tareaEntity.usuario = session.user;
      await this.tareaService.saveOne(tareaEntity);
      /*
      tags.forEach(async (tag) => {
        const newTag = new TagEntity();
        newTag.tagNombre = tag;
        await this.tagService.guardarUno(newTag)

      })
      */

      res.redirect('/tarea/ruta/mostrar-tareas?mensaje=se ha ingresado con exito');
    } catch (e) {
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
      res.render('tarea/rutas/ver-tarea',{
        datos: {
          usuario: session.user,
          tarea: tareaActual,
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
      res.redirect('/tarea/ruta/nuevaTarea?error=error al eliminar')

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
      // const tags = tarea.tags;
      // console.log('tags', tags);
      const tagsEntities = await  this.tagService.buscar({tareas: [tarea]});
      const actualTags = await this.tareaService.getTags(['tags'], { tarea });
      console.log('actual tags ', actualTags);

      const stringTags = [];
      tagsEntities.forEach((tagName) => {
        stringTags.push(tagName.tagNombre);
      });
      const tagsNames = stringTags.join();
      const estadoActual = await this.estadoService.buscar({tarea});


      console.log(new Date(tarea.fechaInicio).toISOString().split('T')[0]);
      res.render(
        'tarea/rutas/crear-tarea', {
          datos: {
            tarea,
            usuario: session.user,
            error,
            id,
            tagsNames,
            estado: estadoActual[0].nombreEstado,
          },
        },
      );
    } catch (e) {
      console.log(e);
      res.redirect('/tarea/ruta/mostrar-tareas?error=error al obtener la tarea del servidor');    }
  }


}
