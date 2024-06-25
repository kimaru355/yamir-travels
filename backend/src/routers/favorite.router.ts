import { Router } from "express";

import {
  createFavorite,
  deleteFavorite,
  getFavorites,
} from "../controllers/favorite.controller";

const FavoriteRouter = Router();

FavoriteRouter.post("/create", createFavorite);
FavoriteRouter.get("/user/:userId", getFavorites);
FavoriteRouter.delete("/delete/:id", deleteFavorite);

export default FavoriteRouter;
