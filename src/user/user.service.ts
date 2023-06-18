import { Injectable } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './user.dto';

@Injectable()
export class UserService {
  getIndex(): string {
    return 'Welcome to the Home Page.';
  }

  getUserById(id: number): object {
    return {
      id: 1,
      name: 'Tamim',
      email: 'tamim@gmail.com',
      phone: '0172222222',
      age: 23,
    };
  }

  getUserByName(mydata: UserDTO): string {
    return mydata.name;
  }

  registation(data: UserDTO): string {
    return data.email;
  }

  updateUser(data: UserUpdateDTO): object {
    console.log(data.id);
    console.log(data.name);
    return data;
  }

  updateUserById(id: number, data: UserDTO): object {
    console.log(id);
    console.log(data);
    return data;
  }
}
