import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../interfaces/res';
import { BookingServices } from '../interfaces/booking_service';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements BookingServices {
  apiUrl: string = 'http://localhost:3000/bookings';
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  createBooking(booking: Booking) {
    return this.http.post<Res<null>>(`${this.apiUrl}/create`, booking, {
      headers: this.headers,
    });
  }

  getAllBookings() {
    return this.http.get<Res<Booking[] | null>>(`${this.apiUrl}/all`, {
      headers: this.headers,
    });
  }

  getBookingsByEventId(eventId: string) {
    return this.http.get<Res<Booking[] | null>>(
      `${this.apiUrl}/event/${eventId}`,
      { headers: this.headers }
    );
  }

  getBookingsByUserId(userId: string) {
    return this.http.get<Res<Booking[] | null>>(
      `${this.apiUrl}/user/${userId}`,
      { headers: this.headers }
    );
  }

  getCompletedBookings() {
    return this.http.get<Res<Booking[] | null>>(`${this.apiUrl}/completed`, {
      headers: this.headers,
    });
  }

  getIncompleteBookings() {
    return this.http.get<Res<Booking[] | null>>(`${this.apiUrl}/incomplete`, {
      headers: this.headers,
    });
  }
}
