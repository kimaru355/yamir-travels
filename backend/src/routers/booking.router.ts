import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByEventId,
  getBookingsByUserId,
  getCompletedBookings,
  getIncompleteBookings,
} from "../controllers/booking.controller";

const BookingRouter = Router();

BookingRouter.post("/create", createBooking);
BookingRouter.get("/completed", getCompletedBookings);
BookingRouter.get("/incomplete", getIncompleteBookings);
BookingRouter.get("/all", getAllBookings);
BookingRouter.get("/event/:eventId", getBookingsByEventId);
BookingRouter.get("/user/:userId", getBookingsByUserId);

export default BookingRouter;
