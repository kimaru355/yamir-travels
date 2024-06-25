import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getIdFromToken = (req: Request): string => {
  try {
    let id: string = "";
    const token: string | undefined = req.headers["authorization"];
    if (!token) {
      return "";
    }
    const response: JwtPayload | String = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (typeof response === "string") {
      id = response;
    } else if ("id" in response) {
      id = response.id as string;
    }
    return id;
  } catch {
    return "";
  }
};
