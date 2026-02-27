import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class UserService {
  users: User[] = [
    {
      id: 1,
      name: 'John',
      age: 25,
    },
    {
      id: 2,
      name: 'Jane',
      age: 30,
    },
    {
      id: 3,
      name: 'Bob',
      age: 28,
    },
  ];

  public async getAll(): Promise<User[]> {
    return this.users;
  }
}
