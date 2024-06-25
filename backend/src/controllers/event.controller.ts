import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { EventService } from "../services/event.service";
import { Event, EventImagesArray } from "../interfaces/event";
import { v4 } from "uuid";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventInput: EventImagesArray = req.body;
  const event: Event = {
    ...eventInput,
    images: eventInput.images.join(":::::"),
  };
  event.id = v4();
  if (
    !event.id ||
    !event.destination ||
    !event.country ||
    !event.duration ||
    !event.durationType ||
    !event.price ||
    !event.tourType ||
    !event.images
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const response: Res<null> = await eventService.createEvent(event);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const event: Event = req.body;
  const response: Res<null> = await eventService.updateEvent(event);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Please provide an id",
      data: null,
    });
  }
  const response: Res<null> = await eventService.deleteEvent(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const id: string = req.params.id;
  const response: Res<Event | null> = await eventService.getEvent(id);
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray> = {
      ...response,
      data: {
        ...response.data,
        images: response.data.images.split(":::::"),
      },
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const response: Res<Event[] | null> = await eventService.getAllEvents();
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByTourType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const tourType: string = req.params.tourType;
  const response: Res<Event[] | null> = await eventService.getEventsByTourType(
    tourType
  );
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventName: string = req.params.eventName;
  const response: Res<Event[] | null> = await eventService.getEventsByName(
    eventName
  );
  if (response.success && response.data) {
    const updatedResponse: Res<EventImagesArray[]> = {
      success: response.success,
      message: response.message,
      data: response.data.map((event) => {
        return {
          ...event,
          images: event.images.split(":::::"),
        };
      }),
    };
    return res.status(200).json(updatedResponse);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};
