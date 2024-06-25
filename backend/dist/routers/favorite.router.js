"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_controller_1 = require("../controllers/favorite.controller");
const FavoriteRouter = (0, express_1.Router)();
FavoriteRouter.post("/create", favorite_controller_1.createFavorite);
FavoriteRouter.get("/user/:userId", favorite_controller_1.getFavorites);
FavoriteRouter.delete("/delete/:id", favorite_controller_1.deleteFavorite);
exports.default = FavoriteRouter;
