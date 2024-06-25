import { Request, Response } from "express";
import { v4 } from "uuid";
import { Res } from "../interfaces/res";
import { AuthService } from "../services/auth.service";
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from "../interfaces/auth";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = new AuthService();
  const user_register: UserRegister = req.body;
  user_register.id = v4();
  if (
    !user_register.id ||
    !user_register.email ||
    !user_register.password ||
    !user_register.name ||
    !user_register.phoneNumber ||
    !user_register.country
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const response: Res<{ role: "user" | "admin" } | null> = await auth.register(
    user_register
  );
  if (response.success) {
    return res.status(201).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const auth = new AuthService();
  const user_login: UserLogin = req.body;
  if (!user_login.email || !user_login.password) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const response: Res<{ role: "user" | "admin" } | null> = await auth.login(
    user_login
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

export const updateDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = new AuthService();
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
  const user_details: UserDetails = req.body;
  user_details.id = id;

  const response: Res<null> = await auth.updateDetails(user_details);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = new AuthService();
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
  const user_passwords: UserPasswords = req.body;
  user_passwords.id = id;
  const response: Res<{ role: "user" | "admin" } | null> =
    await auth.updatePassword(user_passwords);
  if (response.success) {
    return res.status(202).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};
