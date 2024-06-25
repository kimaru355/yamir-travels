export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  bookingDate: string;
  isEventCompleted: boolean;
  createdAt?: Date;
  updateAt?: Date;
}
