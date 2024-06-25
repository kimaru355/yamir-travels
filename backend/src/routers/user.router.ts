import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/details", getUserDetails);

export default UserRouter;
