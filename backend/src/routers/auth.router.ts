import { Router } from "express";
import {
  login,
  register,
  updateDetails,
  updatePassword,
} from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.put("/update_details", updateDetails);
AuthRouter.put("/update_password", updatePassword);

export default AuthRouter;
