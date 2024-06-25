"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const UsersRouter = (0, express_1.Router)();
UsersRouter.get("/", users_controller_1.getAllUsers);
UsersRouter.get("/:id", users_controller_1.getUser);
exports.default = UsersRouter;
