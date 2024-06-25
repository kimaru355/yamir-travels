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
exports.BookingService = void 0;
const client_1 = require("@prisma/client");
class BookingService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.prisma.event.findUnique({
                    where: {
                        id: booking.eventId,
                        isDeleted: false,
                    },
                });
                if (!event) {
                    return {
                        success: false,
                        message: "Event does not exist",
                        data: null,
                    };
                }
                const prevBooking = yield this.prisma.booking.findFirst({
                    where: {
                        userId: booking.userId,
                        eventId: booking.eventId,
                    },
                });
                if (prevBooking) {
                    return {
                        success: false,
                        message: "User has already booked this event",
                        data: null,
                    };
                }
                yield this.prisma.booking.create({
                    data: booking,
                });
                return {
                    success: true,
                    message: "Booking successfully created",
                    data: null,
                };
            }
            catch (error) {
                if (error.message.includes("Foreign key constraint failed")) {
                    return {
                        success: false,
                        message: "Invalid Event or User Id",
                        data: null,
                    };
                }
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.booking.findMany();
                return {
                    success: true,
                    message: "Bookings successfully retrieved",
                    data: bookings,
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
    getCompletedBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.booking.findMany({
                    where: {
                        isEventCompleted: true,
                    },
                });
                return {
                    success: true,
                    message: "Completed bookings successfully retrieved",
                    data: bookings,
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
    getIncompleteBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.booking.findMany({
                    where: {
                        isEventCompleted: false,
                    },
                });
                return {
                    success: true,
                    message: "Incomplete bookings successfully retrieved",
                    data: bookings,
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
    getBookingsByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.booking.findMany({
                    where: {
                        eventId: eventId,
                    },
                });
                return {
                    success: true,
                    message: "Bookings successfully retrieved",
                    data: bookings,
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
    getBookingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.booking.findMany({
                    where: {
                        userId: userId,
                    },
                });
                return {
                    success: true,
                    message: "Bookings successfully retrieved",
                    data: bookings,
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
}
exports.BookingService = BookingService;
