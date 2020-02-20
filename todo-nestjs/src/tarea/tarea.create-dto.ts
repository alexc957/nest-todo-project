import { IsDateString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class TareaCreateDto {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(40)
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;
}
