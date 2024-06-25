import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/users.controller";

const UsersRouter = Router();

UsersRouter.get("/", getAllUsers);
UsersRouter.get("/:id", getUser);

export default UsersRouter;
