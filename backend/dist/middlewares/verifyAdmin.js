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
exports.verifyAdmin = void 0;
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const users_service_1 = require("../services/users.service");
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    const usersService = new users_service_1.UsersService();
    const response = yield usersService.isAdmin(id);
    if (!response.success && response.message === "An Error Occurred") {
        return res.status(200).json(response);
    }
    if (!response.data) {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
            data: null,
        });
    }
    next();
});
exports.verifyAdmin = verifyAdmin;
