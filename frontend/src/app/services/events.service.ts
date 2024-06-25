import { Injectable } from '@angular/core';
import { EventServices } from '../interfaces/event_service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../interfaces/event';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class EventsService implements EventServices {
  apiUrl: string = 'http://localhost:3000/events';
  constructor(private http: HttpClient) {}

  createEvent(event: Event) {
    return this.http.post<Res<null>>(`${this.apiUrl}/create`, event);
  }

  updateEvent(event: Event) {
    return this.http.put<Res<null>>(`${this.apiUrl}/update`, event);
  }

  deleteEvent(id: string) {
    return this.http.delete<Res<null>>(`${this.apiUrl}/delete/${id}`);
  }

  getAllEvents() {
    return this.http.get<Res<Event[] | null>>(`${this.apiUrl}/all`);
  }

  getEventsByName(eventName: string) {
    return this.http.get<Res<Event[] | null>>(
      `${this.apiUrl}/name/${eventName}`
    );
  }

  getEventsByTourType(tourType: string) {
    return this.http.get<Res<Event[] | null>>(
      `${this.apiUrl}/tour_type/${tourType}`
    );
  }

  getEvent(eventId: string) {
    return this.http.get<Res<Event | null>>(`${this.apiUrl}/${eventId}`);
  }
}
