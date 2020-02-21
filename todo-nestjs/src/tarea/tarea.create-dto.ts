import { IsDateString, IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class TareaCreateDto {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(2000)
  descripcion: string;


  @IsNotEmpty()
  fechaInicio: string;


  @IsNotEmpty()
  fechaFin: string;

  @IsNotEmpty()
  @IsIn(['DONE', 'DOING', 'TODO'])
  estadoNombre: string;
}
