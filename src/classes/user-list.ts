import { User } from "./user";
export class UserList {
  private users: User[] = [];

  constructor() {}

  addUser(user: User) {
    this.users.push(user);
    return user;
  }

  updateUser(id: string, name: string) {
    const found = this.users.find(user => user.id === id);
    if (found) found.name = name;
    console.log(this.users);
  }

  getUsers() {
    return this.users.filter(user => user.name !== undefined);
  }

  getUser(id: string) {
    return this.users.find(user => user.id === id);
  }

  getUsersByRoom(room: string) {
    return this.users.filter(user => user.room === room);
  }

  deleteUser(id: string) {
    const deletedUser = this.getUser(id);
    this.users = this.users.filter(user => user.id !== id);
    console.log(this.users);
    return deletedUser;
  }
}
