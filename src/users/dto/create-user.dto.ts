import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}