import { PrismaClient } from "@prisma/client";
import { UsersServices } from "../interfaces/users_service";
import { Res } from "../interfaces/res";
import { User } from "../interfaces/user";

export class UsersService implements UsersServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getUsers(): Promise<Res<User[] | null>> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          country: true,
        },
      });
      return {
        success: true,
        message: "Users successfully retrieved",
        data: users,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getUser(id: string): Promise<Res<User | null>> {
    try {
      const user = await this.prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          country: true,
        },
        where: { id },
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "User successfully retrieved",
        data: user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async isAdmin(id: string): Promise<Res<boolean>> {
    try {
      const user = await this.prisma.user.findUnique({
        select: {
          role: true,
        },
        where: { id },
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: false,
        };
      }
      return {
        success: true,
        message: "User successfully retrieved",
        data: user.role === "admin" ? true : false,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: false,
      };
    }
  }
}
