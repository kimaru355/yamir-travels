"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getIdFromToken = (req) => {
    try {
        let id = "";
        const token = req.headers["authorization"];
        if (!token) {
            return "";
        }
        const response = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof response === "string") {
            id = response;
        }
        else if ("id" in response) {
            id = response.id;
        }
        return id;
    }
    catch (_a) {
        return "";
    }
};
exports.getIdFromToken = getIdFromToken;
