import { Request, Response } from "express";
import { FavoriteService } from "../services/favorite.service";
import { Favorite } from "../interfaces/favorite";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const createFavorite = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const favoriteService = new FavoriteService();
  const favorite: Favorite = req.body;
  favorite.id = v4();
  if (!favorite.id || !favorite.eventId || !favorite.userId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const response: Res<null> = await favoriteService.createFavorite(favorite);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getFavorites = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const favoriteService = new FavoriteService();
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const userId: string = id;
  const response: Res<Favorite[] | null> = await favoriteService.getFavorites(
    userId
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const deleteFavorite = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const favoriteService = new FavoriteService();
  const id: string = req.params.id;
  const response: Res<Favorite | null> = await favoriteService.deleteFavorite(
    id
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
