import { Event } from './event';
import { Res } from './res';

export interface EventServices {
  createEvent(event: Event): any;
  updateEvent(event: Event): any;
  deleteEvent(id: string): any;
  getEvent(eventId: string): any;
  getAllEvents(): any;
  getEventsByTourType(tourType: string): any;
  getEventsByName(eventName: string): any;
}
