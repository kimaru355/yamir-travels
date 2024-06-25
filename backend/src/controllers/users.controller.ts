import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const response = await usersService.getUsers();
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getUser = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const id = req.params.id;
  const response = await usersService.getUser(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
