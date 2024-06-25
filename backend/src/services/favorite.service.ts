import { PrismaClient } from "@prisma/client";
import { Favorite } from "../interfaces/favorite";
import { FavoriteServices } from "../interfaces/favorite_service";
import { Res } from "../interfaces/res";

export class FavoriteService implements FavoriteServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createFavorite(favorite: Favorite): Promise<Res<null>> {
    try {
      await this.prisma.favorites.create({
        data: favorite,
      });
      return {
        success: true,
        message: "Favorite successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getFavorites(userId: string): Promise<Res<Favorite[] | null>> {
    try {
      const favorites = await this.prisma.favorites.findMany({
        where: {
          userId,
        },
      });
      return {
        success: true,
        message: "Favorites successfully retrieved",
        data: favorites,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async deleteFavorite(id: string): Promise<Res<Favorite | null>> {
    try {
      const favorite = await this.prisma.favorites.delete({
        where: {
          id,
        },
      });
      return {
        success: true,
        message: "Favorite successfully deleted",
        data: favorite,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
