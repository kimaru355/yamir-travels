import { Injectable } from '@angular/core';
import { EventServices } from '../interfaces/event_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../interfaces/event';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class EventsService implements EventServices {
  apiUrl: string = 'http://localhost:3000/events';
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  createEvent(event: Event) {
    return this.http.post<Res<null>>(`${this.apiUrl}/create`, event, {
      headers: this.headers,
    });
  }

  updateEvent(event: Event) {
    return this.http.put<Res<null>>(`${this.apiUrl}/update`, event, {
      headers: this.headers,
    });
  }

  deleteEvent(id: string) {
    return this.http.delete<Res<null>>(`${this.apiUrl}/delete/${id}`, {
      headers: this.headers,
    });
  }

  getAllEvents() {
    return this.http.get<Res<Event[] | null>>(`${this.apiUrl}/all`, {
      headers: this.headers,
    });
  }

  getEventsByName(eventName: string) {
    return this.http.get<Res<Event[] | null>>(
      `${this.apiUrl}/name/${eventName}`,
      { headers: this.headers }
    );
  }

  getEventsByTourType(tourType: string) {
    return this.http.get<Res<Event[] | null>>(
      `${this.apiUrl}/tour_type/${tourType}`,
      { headers: this.headers }
    );
  }

  getEvent(eventId: string) {
    return this.http.get<Res<Event | null>>(`${this.apiUrl}/${eventId}`, {
      headers: this.headers,
    });
  }
}
