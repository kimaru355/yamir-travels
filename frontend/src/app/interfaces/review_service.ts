import { Review } from './review';

export interface ReviewServices {
  createReview(review: Review): any;
  updateReview(review: Review): any;
  deleteReview(id: string): any;
  getAllReviews(): any;
  getReviewsByUserId(userId: string): any;
  getReviewsByEventId(eventId: string): any;
}
