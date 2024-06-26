"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.getFavorites = exports.createFavorite = void 0;
const favorite_service_1 = require("../services/favorite.service");
const uuid_1 = require("uuid");
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const createFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteService = new favorite_service_1.FavoriteService();
    const favorite = req.body;
    favorite.id = (0, uuid_1.v4)();
    if (!favorite.id || !favorite.eventId || !favorite.userId) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const response = yield favoriteService.createFavorite(favorite);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createFavorite = createFavorite;
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteService = new favorite_service_1.FavoriteService();
    const id = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const userId = id;
    const response = yield favoriteService.getFavorites(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getFavorites = getFavorites;
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteService = new favorite_service_1.FavoriteService();
    const id = req.params.id;
    const response = yield favoriteService.deleteFavorite(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.deleteFavorite = deleteFavorite;
