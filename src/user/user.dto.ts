import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString({ message: 'invalid name' })
  @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}

export class UserUpdateDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  age: number;
}
