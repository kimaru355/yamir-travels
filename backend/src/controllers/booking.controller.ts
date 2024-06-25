import { v4 } from "uuid";
import { BookingService } from "../services/booking.service";
import { Request, Response } from "express";
import { Booking } from "../interfaces/booking";
import { Res } from "../interfaces/res";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const createBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const booking: Booking = req.body;
  booking.id = v4();
  booking.userId = getIdFromToken(req);
  if (!booking.userId) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  if (!booking.eventId || !booking.bookingDate) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }

  const response: Res<null> = await bookingService.createBooking(booking);
  if (response.success) {
    return res.status(201).json(response);
  } else if (response.message !== "An error occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const response: Res<Booking[] | null> = await bookingService.getAllBookings();
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getCompletedBookings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const response: Res<Booking[] | null> =
    await bookingService.getCompletedBookings();
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getIncompleteBookings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const response: Res<Booking[] | null> =
    await bookingService.getIncompleteBookings();
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getBookingsByEventId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const eventId = req.params.eventId;
  const response: Res<Booking[] | null> =
    await bookingService.getBookingsByEventId(eventId);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getBookingsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bookingService = new BookingService();
  const userId = req.params.userId;
  const response: Res<Booking[] | null> =
    await bookingService.getBookingsByUserId(userId);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
