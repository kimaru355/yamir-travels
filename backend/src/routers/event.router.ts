import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventsByName,
  updateEvent,
} from "../controllers/event.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const EventRouter = Router();

EventRouter.post("/create", createEvent);
EventRouter.put("/update", verifyAdmin, updateEvent);
EventRouter.delete("/delete/:id", verifyAdmin, deleteEvent);
EventRouter.get("/all", getAllEvents);
EventRouter.get("/name/:eventName", getEventsByName);
EventRouter.get("/tour_type/:tourType", getEventsByName);
EventRouter.get("/:id", getEvent);

export default EventRouter;
