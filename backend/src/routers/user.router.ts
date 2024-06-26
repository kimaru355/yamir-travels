import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller";
import { isAdmin } from "../controllers/isAdmin.controller";

const UserRouter = Router();

UserRouter.get("/details", getUserDetails);
UserRouter.get("/isAdmin", isAdmin);

export default UserRouter;
