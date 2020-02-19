import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsuarioCreateDto {

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  @MinLength(4)
  passwordHash: string;

}
