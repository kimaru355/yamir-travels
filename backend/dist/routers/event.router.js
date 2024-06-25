"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const verifyAdmin_1 = require("../middlewares/verifyAdmin");
const EventRouter = (0, express_1.Router)();
EventRouter.post("/create", verifyAdmin_1.verifyAdmin, event_controller_1.createEvent);
EventRouter.put("/update", verifyAdmin_1.verifyAdmin, event_controller_1.updateEvent);
EventRouter.delete("/delete/:id", verifyAdmin_1.verifyAdmin, event_controller_1.deleteEvent);
EventRouter.get("/all", event_controller_1.getAllEvents);
EventRouter.get("/name/:eventName", event_controller_1.getEventsByName);
EventRouter.get("/tour_type/:tourType", event_controller_1.getEventsByName);
EventRouter.get("/:id", event_controller_1.getEvent);
exports.default = EventRouter;
