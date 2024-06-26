import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { UsersService } from "../services/users.service";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const isAdmin = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const id: string = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid token",
      data: false,
    });
  }
  const response: Res<boolean> = await usersService.isAdmin(id);
  return res.status(200).json(response);
};
