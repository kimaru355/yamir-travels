import { Res } from "./res";
import { UserDetails, UserLogin, UserPasswords, UserRegister } from "./auth";

export interface AuthServices {
  register(
    user_register: UserRegister
  ): Promise<Res<{ role: "user" | "admin"; token: string } | null>>;
  login(
    user_login: UserLogin
  ): Promise<Res<{ role: "user" | "admin"; token: string } | null>>;
  updateDetails(user_details: UserDetails): Promise<Res<null>>;
  updatePassword(user_passwords: UserPasswords): Promise<Res<null>>;
}
