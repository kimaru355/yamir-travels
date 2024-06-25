import { Injectable } from '@angular/core';
import { ReviewServices } from '../interfaces/review_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../interfaces/review';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService implements ReviewServices {
  apiUrl: string = 'http://localhost:3000/reviews';
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  createReview(review: Review) {
    return this.http.post<Res<null>>(`${this.apiUrl}/create`, review, {
      headers: this.headers,
    });
  }

  getAllReviews() {
    return this.http.get<Res<Review[] | null>>(`${this.apiUrl}/all`, {
      headers: this.headers,
    });
  }

  updateReview(review: Review) {
    return this.http.put<Res<null>>(
      `${this.apiUrl}/update/${review.id}`,
      review,
      { headers: this.headers }
    );
  }

  deleteReview(reviewId: string) {
    return this.http.delete<Res<null>>(`${this.apiUrl}/delete/${reviewId}`, {
      headers: this.headers,
    });
  }

  getReviewsByUserId(userId: string) {
    return this.http.get<Res<Review[] | null>>(
      `${this.apiUrl}/user/${userId}`,
      {
        headers: this.headers,
      }
    );
  }

  getReviewsByEventId(eventId: string) {
    return this.http.get<Res<Review[] | null>>(
      `${this.apiUrl}/event/${eventId}`,
      {
        headers: this.headers,
      }
    );
  }
}
