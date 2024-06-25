import { Event } from "./event";
import { Res } from "./res";

export interface EventServices {
  createEvent(event: Event): Promise<Res<null>>;
  updateEvent(event: Event): Promise<Res<null>>;
  deleteEvent(id: string): Promise<Res<null>>;
  getEvent(eventId: string): Promise<Res<Event | null>>;
  getAllEvents(): Promise<Res<Event[] | null>>;
  getEventsByTourType(tourType: string): Promise<Res<Event[] | null>>;
  getEventsByName(eventName: string): Promise<Res<Event[] | null>>;
}
