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
exports.FavoriteService = void 0;
const client_1 = require("@prisma/client");
class FavoriteService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createFavorite(favorite) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.favorites.create({
                    data: favorite,
                });
                return {
                    success: true,
                    message: "Favorite successfully created",
                    data: null,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favorites = yield this.prisma.favorites.findMany({
                    where: {
                        userId,
                    },
                });
                return {
                    success: true,
                    message: "Favorites successfully retrieved",
                    data: favorites,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    deleteFavorite(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favorite = yield this.prisma.favorites.delete({
                    where: {
                        id,
                    },
                });
                return {
                    success: true,
                    message: "Favorite successfully deleted",
                    data: favorite,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
}
exports.FavoriteService = FavoriteService;
