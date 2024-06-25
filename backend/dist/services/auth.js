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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    register(user_register) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = bcryptjs_1.default.hashSync(user_register.password, 10);
                user_register.password = hashedPassword;
                yield this.prisma.user.create({
                    data: user_register,
                });
                const token = jsonwebtoken_1.default.sign({ id: user_register.id }, process.env.JWT_SECRET, {
                    expiresIn: "30m",
                });
                return {
                    success: true,
                    message: "Account successfully created",
                    data: {
                        role: "user",
                        token: token,
                    },
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.message.includes("Unique constraint failed")) {
                        return {
                            success: false,
                            message: "Email or Phone Number already in use",
                            data: null,
                        };
                    }
                }
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    login(user_login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        email: user_login.email,
                    },
                });
                if (!user) {
                    return {
                        success: false,
                        message: "Invalid email or password",
                        data: null,
                    };
                }
                if (user.role !== "user" && user.role !== "admin") {
                    return {
                        success: false,
                        message: "An Error occurred",
                        data: null,
                    };
                }
                const doPasswordsMatch = bcryptjs_1.default.compareSync(user_login.password, user.password);
                if (!doPasswordsMatch) {
                    return {
                        success: false,
                        message: "Invalid email or password",
                        data: null,
                    };
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "30m",
                });
                return {
                    success: true,
                    message: "User successfully logged in",
                    data: { role: user.role, token: token },
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
    updateDetails(user_details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.user.update({
                    where: {
                        id: user_details.id,
                    },
                    data: {
                        email: user_details.email,
                        name: user_details.name,
                        phoneNumber: user_details.phoneNumber,
                        country: user_details.country,
                    },
                });
                return {
                    success: true,
                    message: "Profile successfully updated",
                    data: null,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.message.includes("Unique constraint failed")) {
                        return {
                            success: false,
                            message: "Email or Phone Number already in use",
                            data: null,
                        };
                    }
                }
                return {
                    success: false,
                    message: "An error occurred",
                    data: null,
                };
            }
        });
    }
    updatePassword(user_passwords) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        id: user_passwords.id,
                    },
                });
                if (!user) {
                    return {
                        success: false,
                        message: "User not found",
                        data: null,
                    };
                }
                const doPasswordsMatch = bcryptjs_1.default.compareSync(user_passwords.old_password, user.password);
                if (!doPasswordsMatch) {
                    return {
                        success: false,
                        message: "Incorrect password",
                        data: null,
                    };
                }
                const hashedPassword = bcryptjs_1.default.hashSync(user_passwords.new_password, 10);
                yield this.prisma.user.update({
                    where: {
                        id: user_passwords.id,
                    },
                    data: {
                        password: hashedPassword,
                    },
                });
                return {
                    success: true,
                    message: "Profile successfully updated",
                    data: null,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An error occurred",
                    data: null,
                };
            }
        });
    }
}
exports.AuthService = AuthService;
