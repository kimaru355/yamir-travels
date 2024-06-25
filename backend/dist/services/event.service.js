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
exports.EventService = void 0;
const client_1 = require("@prisma/client");
class EventService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.event.create({
                    data: event,
                });
                return {
                    success: true,
                    message: "Event successfully created",
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
    updateEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.event.update({
                    where: {
                        id: event.id,
                    },
                    data: event,
                });
                return {
                    success: true,
                    message: "Event successfully updated",
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
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.event.update({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                    data: {
                        isDeleted: true,
                    },
                });
                return {
                    success: true,
                    message: "Event successfully deleted",
                    data: null,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.message.includes("Record to update not found")) {
                        return {
                            success: false,
                            message: "Event not found",
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
    getEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.prisma.event.findUnique({
                    where: {
                        id: eventId,
                        isDeleted: false,
                    },
                });
                if (!event) {
                    return {
                        success: false,
                        message: "Event not found",
                        data: null,
                    };
                }
                delete event.isDeleted;
                return {
                    success: true,
                    message: "Event found",
                    data: event,
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
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.prisma.event.findMany({
                    where: {
                        isDeleted: false,
                    },
                });
                events.forEach((event) => {
                    delete event.isDeleted;
                });
                return {
                    success: true,
                    message: "Events found",
                    data: events,
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
    getEventsByTourType(tourType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.prisma.event.findMany({
                    where: {
                        tourType: tourType,
                        isDeleted: false,
                    },
                });
                return {
                    success: true,
                    message: "Events found",
                    data: events,
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
    getEventsByName(eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.prisma.event.findMany({
                    where: {
                        isDeleted: false,
                        destination: {
                            contains: eventName,
                        },
                    },
                });
                return {
                    success: true,
                    message: "Events found",
                    data: events,
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
exports.EventService = EventService;
