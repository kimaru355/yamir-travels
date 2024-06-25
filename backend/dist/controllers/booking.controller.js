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
exports.getBookingsByUserId = exports.getBookingsByEventId = exports.getIncompleteBookings = exports.getCompletedBookings = exports.getAllBookings = exports.createBooking = void 0;
const uuid_1 = require("uuid");
const booking_service_1 = require("../services/booking.service");
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const booking = req.body;
    booking.id = (0, uuid_1.v4)();
    booking.userId = (0, get_id_from_token_1.getIdFromToken)(req);
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
    const response = yield bookingService.createBooking(booking);
    if (response.success) {
        return res.status(201).json(response);
    }
    else if (response.message !== "An error occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createBooking = createBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const response = yield bookingService.getAllBookings();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getAllBookings = getAllBookings;
const getCompletedBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const response = yield bookingService.getCompletedBookings();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getCompletedBookings = getCompletedBookings;
const getIncompleteBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const response = yield bookingService.getIncompleteBookings();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getIncompleteBookings = getIncompleteBookings;
const getBookingsByEventId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const eventId = req.params.eventId;
    const response = yield bookingService.getBookingsByEventId(eventId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getBookingsByEventId = getBookingsByEventId;
const getBookingsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.BookingService();
    const userId = req.params.userId;
    const response = yield bookingService.getBookingsByUserId(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getBookingsByUserId = getBookingsByUserId;
