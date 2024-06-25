import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';
import { BookingService } from '../../services/bookings.service';
import { Booking } from '../../interfaces/booking';
import { FormsModule } from '@angular/forms';
import { Review } from '../../interfaces/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, FormatCurrencyPipe, FormsModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent {
  eventId: string = '';
  event!: Event;
  mainImage: string = '';
  isBooking: boolean = false;
  bookingDate: Date = new Date();
  booking: Booking = {
    eventId: '',
    bookingDate: new Date().toISOString(),
  };
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private bookingService: BookingService,
    private router: Router,
    private reviewService: ReviewsService
  ) {
    this.getEvent();
  }

  getEvent() {
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
    });
    if (this.eventId) {
      this.eventService.getEvent(this.eventId).subscribe((response) => {
        if (response.success && response.data) {
          this.event = response.data;
          this.mainImage = this.event.images[0];
          this.booking.eventId = this.eventId;
        }
      });
      this.getReviews();
    }
  }

  getReviews() {
    this.reviewService
      .getReviewsByEventId(this.eventId)
      .subscribe((response) => {
        if (response.success && response.data) {
          this.reviews = response.data;
        }
      });
  }

  bookTour() {
    this.bookingService.createBooking(this.booking).subscribe((response) => {
      if (response.success) {
        alert('Event booked successfully');
        this.isBooking = false;
      } else if (response.message === 'Invalid or expired token') {
        // localStorage.removeItem('token');
        // this.router.navigate(['/login']);
      }
    });
  }
}
