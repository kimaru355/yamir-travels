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
exports.getEventsByName = exports.getEventsByTourType = exports.getAllEvents = exports.getEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = void 0;
const event_service_1 = require("../services/event.service");
const uuid_1 = require("uuid");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const eventInput = req.body;
    const event = Object.assign(Object.assign({}, eventInput), { images: eventInput.images.join(":::::") });
    event.id = (0, uuid_1.v4)();
    if (!event.id ||
        !event.destination ||
        !event.country ||
        !event.duration ||
        !event.durationType ||
        !event.price ||
        !event.tourType ||
        !event.images) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const response = yield eventService.createEvent(event);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const event = req.body;
    const response = yield eventService.updateEvent(event);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Please provide an id",
            data: null,
        });
    }
    const response = yield eventService.deleteEvent(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.deleteEvent = deleteEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const id = req.params.id;
    const response = yield eventService.getEvent(id);
    if (response.success && response.data) {
        const updatedResponse = Object.assign(Object.assign({}, response), { data: Object.assign(Object.assign({}, response.data), { images: response.data.images.split(":::::") }) });
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getEvent = getEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const response = yield eventService.getAllEvents();
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((event) => {
                return Object.assign(Object.assign({}, event), { images: event.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getAllEvents = getAllEvents;
const getEventsByTourType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const tourType = req.params.tourType;
    const response = yield eventService.getEventsByTourType(tourType);
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((event) => {
                return Object.assign(Object.assign({}, event), { images: event.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getEventsByTourType = getEventsByTourType;
const getEventsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new event_service_1.EventService();
    const eventName = req.params.eventName;
    const response = yield eventService.getEventsByName(eventName);
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((event) => {
                return Object.assign(Object.assign({}, event), { images: event.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getEventsByName = getEventsByName;
