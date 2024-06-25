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
exports.getUser = exports.getAllUsers = void 0;
const users_service_1 = require("../services/users.service");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersService = new users_service_1.UsersService();
    const response = yield usersService.getUsers();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(404).json(response);
    }
    return res.status(500).json(response);
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersService = new users_service_1.UsersService();
    const id = req.params.id;
    const response = yield usersService.getUser(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(404).json(response);
    }
    return res.status(500).json(response);
});
exports.getUser = getUser;
