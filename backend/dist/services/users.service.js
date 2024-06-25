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
exports.UsersService = void 0;
const client_1 = require("@prisma/client");
class UsersService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.prisma.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phoneNumber: true,
                        country: true,
                    },
                });
                return {
                    success: true,
                    message: "Users successfully retrieved",
                    data: users,
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
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phoneNumber: true,
                        country: true,
                    },
                    where: { id },
                });
                if (!user) {
                    return {
                        success: false,
                        message: "User not found",
                        data: null,
                    };
                }
                return {
                    success: true,
                    message: "User successfully retrieved",
                    data: user,
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
    isAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    select: {
                        role: true,
                    },
                    where: { id },
                });
                if (!user) {
                    return {
                        success: false,
                        message: "User not found",
                        data: false,
                    };
                }
                return {
                    success: true,
                    message: "User successfully retrieved",
                    data: user.role === "admin" ? true : false,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: false,
                };
            }
        });
    }
}
exports.UsersService = UsersService;
