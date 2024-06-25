import { Booking } from './booking';

export interface BookingServices {
  createBooking(booking: Booking): any;
  getAllBookings(): any;
  getCompletedBookings(): any;
  getIncompleteBookings(): any;
  getBookingsByEventId(eventId: string): any;
  getBookingsByUserId(userId: string): any;
}
