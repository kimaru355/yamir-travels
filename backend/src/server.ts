import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routers/auth.router";
import BookingRouter from "./routers/booking.router";
import ReviewRouter from "./routers/review.router";
import EventRouter from "./routers/event.router";
import FavoriteRouter from "./routers/favorite.router";
import { verifyToken } from "./middlewares/verifyToken";
import UsersRouter from "./routers/users.router";
import { verifyAdmin } from "./middlewares/verifyAdmin";
import UserRouter from "./routers/user.router";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(json());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
  next();
});

app.use("/auth", AuthRouter);
app.use("/bookings", verifyToken, BookingRouter);
app.use("/reviews", verifyToken, ReviewRouter);
app.use("/events", EventRouter);
app.use("/favorites", verifyToken, FavoriteRouter);
app.use("/users", verifyToken, verifyAdmin, UsersRouter);
app.use("/user", verifyToken, UserRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
