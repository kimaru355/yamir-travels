import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthServices } from "../interfaces/auth_service";
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from "../interfaces/auth";
import { Res } from "../interfaces/res";

export class AuthService implements AuthServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async register(
    user_register: UserRegister
  ): Promise<Res<{ role: "user" | "admin"; token: string } | null>> {
    try {
      const hashedPassword = bcrypt.hashSync(user_register.password, 10);
      user_register.password = hashedPassword;
      await this.prisma.user.create({
        data: user_register,
      });
      const token = jwt.sign(
        { id: user_register.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "30m",
        }
      );
      return {
        success: true,
        message: "Account successfully created",
        data: {
          role: "user",
          token: token,
        },
      };
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Unique constraint failed")) {
          return {
            success: false,
            message: "Email or Phone Number already in use",
            data: null,
          };
        }
      }
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async login(
    user_login: UserLogin
  ): Promise<Res<{ role: "user" | "admin"; token: string } | null>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: user_login.email,
        },
      });
      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }
      if (user.role !== "user" && user.role !== "admin") {
        return {
          success: false,
          message: "An Error occurred",
          data: null,
        };
      }

      const doPasswordsMatch = bcrypt.compareSync(
        user_login.password,
        user.password
      );
      if (!doPasswordsMatch) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "30m",
        }
      );
      return {
        success: true,
        message: "User successfully logged in",
        data: { role: user.role, token: token },
      };
    } catch (error) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateDetails(user_details: UserDetails): Promise<Res<null>> {
    try {
      await this.prisma.user.update({
        where: {
          id: user_details.id,
        },
        data: {
          email: user_details.email,
          name: user_details.name,
          phoneNumber: user_details.phoneNumber,
          country: user_details.country,
        },
      });
      return {
        success: true,
        message: "Profile successfully updated",
        data: null,
      };
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Unique constraint failed")) {
          return {
            success: false,
            message: "Email or Phone Number already in use",
            data: null,
          };
        }
      }

      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async updatePassword(user_passwords: UserPasswords): Promise<Res<null>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: user_passwords.id,
        },
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      const doPasswordsMatch = bcrypt.compareSync(
        user_passwords.old_password,
        user.password
      );
      if (!doPasswordsMatch) {
        return {
          success: false,
          message: "Incorrect password",
          data: null,
        };
      }
      const hashedPassword = bcrypt.hashSync(user_passwords.new_password, 10);
      await this.prisma.user.update({
        where: {
          id: user_passwords.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return {
        success: true,
        message: "Profile successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }
}
