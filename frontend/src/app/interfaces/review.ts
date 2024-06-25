export interface Review {
  id: string;
  eventId: string;
  userId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
