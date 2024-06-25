import { Res } from "./res";
import { User } from "./user";

export interface UsersServices {
  getUsers(): Promise<Res<User[] | null>>;
  getUser(id: string): Promise<Res<User | null>>;
  isAdmin(id: string): Promise<Res<boolean>>;
}
