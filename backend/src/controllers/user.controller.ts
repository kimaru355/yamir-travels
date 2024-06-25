import { Request, Response } from "express";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { UsersService } from "../services/users.service";

export const getUserDetails = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({ success: false, message: "Unauthorized" });
  }
  const response = await usersService.getUser(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
