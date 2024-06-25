import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, FormatCurrencyPipe],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent {
  eventId: string = '';
  event!: Event;
  mainImage: string = '';
  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
    });
    if (this.eventId) {
      this.eventService.getEvent(this.eventId).subscribe((response) => {
        if (response.success && response.data) {
          this.event = response.data;
          this.mainImage = this.event.images[0];
        }
      });
    }
  }
}
