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
exports.getUserDetails = void 0;
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const users_service_1 = require("../services/users.service");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersService = new users_service_1.UsersService();
    const id = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!id) {
        return res.status(200).json({ success: false, message: "Unauthorized" });
    }
    const response = yield usersService.getUser(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getUserDetails = getUserDetails;
