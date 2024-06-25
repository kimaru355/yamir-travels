"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const booking_router_1 = __importDefault(require("./routers/booking.router"));
const review_router_1 = __importDefault(require("./routers/review.router"));
const event_router_1 = __importDefault(require("./routers/event.router"));
const favorite_router_1 = __importDefault(require("./routers/favorite.router"));
const verifyToken_1 = require("./middlewares/verifyToken");
const users_router_1 = __importDefault(require("./routers/users.router"));
const verifyAdmin_1 = require("./middlewares/verifyAdmin");
const user_router_1 = __importDefault(require("./routers/user.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use((0, express_1.json)());
app.use((error, req, res, next) => {
    if (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
    next();
});
app.use("/auth", auth_router_1.default);
app.use("/bookings", verifyToken_1.verifyToken, booking_router_1.default);
app.use("/reviews", verifyToken_1.verifyToken, review_router_1.default);
app.use("/events", event_router_1.default);
app.use("/favorites", verifyToken_1.verifyToken, favorite_router_1.default);
app.use("/users", verifyToken_1.verifyToken, verifyAdmin_1.verifyAdmin, users_router_1.default);
app.use("/user", verifyToken_1.verifyToken, user_router_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
