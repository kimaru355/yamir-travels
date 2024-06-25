import { NextFunction, Request, Response } from "express";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { Res } from "../interfaces/res";
import { UsersService } from "../services/users.service";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  const usersService = new UsersService();
  const response: Res<boolean | null> = await usersService.isAdmin(id);
  if (!response.success && response.message === "An Error Occurred") {
    return res.status(200).json(response);
  }
  if (!response.data) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
      data: null,
    });
  }
  next();
};
