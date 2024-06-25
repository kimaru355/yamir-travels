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
exports.ReviewService = void 0;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const calculateDate_1 = require("../helpers/calculateDate");
class ReviewService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.prisma.event.findUnique({
                    where: {
                        id: review.eventId,
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
                const booking = yield this.prisma.booking.findFirst({
                    where: {
                        userId: review.userId,
                        eventId: review.eventId,
                    },
                });
                if (!booking) {
                    return {
                        success: false,
                        message: "User has not booked this event",
                        data: null,
                    };
                }
                booking.isEventCompleted = (0, calculateDate_1.isEventCompleted)(event, booking);
                if (!booking.isEventCompleted) {
                    return {
                        success: false,
                        message: "Travel is not completed",
                        data: null,
                    };
                }
                review.bookingId = booking.id;
                yield this.prisma.review.create({
                    data: review,
                });
                return {
                    success: true,
                    message: "Review successfully created",
                    data: null,
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
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.prisma.review.findMany();
                return {
                    success: true,
                    message: "Reviews successfully retrieved",
                    data: reviews,
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
    getReviewsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.prisma.review.findMany({
                    where: {
                        userId,
                    },
                });
                return {
                    success: true,
                    message: "Reviews successfully retrieved",
                    data: reviews,
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
    getReviewsByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.prisma.event.findUnique({
                    where: {
                        id: eventId,
                    },
                });
                if (!event) {
                    return {
                        success: false,
                        message: "Event does not exist",
                        data: null,
                    };
                }
                const reviews = yield this.prisma.review.findMany({
                    where: {
                        eventId,
                    },
                });
                return {
                    success: true,
                    message: "Reviews successfully retrieved",
                    data: reviews,
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
    updateReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.review.update({
                    where: {
                        id: review.id,
                    },
                    data: review,
                });
                return {
                    success: true,
                    message: "Review successfully updated",
                    data: null,
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
    deleteReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.review.delete({
                    where: {
                        id,
                    },
                });
                return {
                    success: true,
                    message: "Review successfully deleted",
                    data: null,
                };
            }
            catch (unknownError) {
                if (!(unknownError instanceof library_1.PrismaClientKnownRequestError)) {
                    return {
                        success: false,
                        message: "An Error Occurred",
                        data: null,
                    };
                }
                const error = unknownError;
                if (error.message.includes("Record to delete does not exist.")) {
                    return {
                        success: false,
                        message: "Event not found",
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
}
exports.ReviewService = ReviewService;
