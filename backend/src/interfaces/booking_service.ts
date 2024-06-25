import { Booking } from "./booking";
import { Res } from "./res";

export interface BookingServices {
  createBooking(booking: Booking): Promise<Res<null>>;
  getAllBookings(): Promise<Res<Booking[] | null>>;
  getCompletedBookings(): Promise<Res<Booking[] | null>>;
  getIncompleteBookings(): Promise<Res<Booking[] | null>>;
  getBookingsByEventId(eventId: string): Promise<Res<Booking[] | null>>;
  getBookingsByUserId(userId: string): Promise<Res<Booking[] | null>>;
}
