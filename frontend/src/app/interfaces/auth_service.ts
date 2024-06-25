import { Res } from './res';
import { UserDetails, UserLogin, UserPasswords, UserRegister } from './auth';

export interface AuthServices {
  register(user_register: UserRegister): any;
  login(user_login: UserLogin): any;
  updateDetails(user_details: UserDetails): any;
  updatePassword(user_passwords: UserPasswords): any;
}
