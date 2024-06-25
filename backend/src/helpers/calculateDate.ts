import { Booking } from "../interfaces/booking";
import { Event } from "../interfaces/event";

export function isEventCompleted(event: Event, booking: Booking): boolean {
  const durationTypes: string[] = ["years", "months", "weeks", "days", "hours"];
  if (!durationTypes.includes(event.durationType)) {
    return false;
  }
  const now = new Date();
  const bookingDate = new Date(booking.bookingDate);
  if (event.durationType === "years") {
    bookingDate.setFullYear(bookingDate.getFullYear() + event.duration);
  } else if (event.durationType === "months") {
    bookingDate.setMonth(bookingDate.getMonth() + event.duration);
  } else if (event.durationType === "weeks") {
    bookingDate.setDate(bookingDate.getDate() + event.duration * 7);
  } else if (event.durationType === "days") {
    bookingDate.setDate(bookingDate.getDate() + event.duration);
  } else if (event.durationType === "hours") {
    bookingDate.setHours(bookingDate.getHours() + event.duration);
  }
  if (now < bookingDate) {
    return false;
  } else {
    return true;
  }
}
