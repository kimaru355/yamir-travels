import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatCurrencyPipe],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent {
  events: Event[] = [];

  constructor(private eventService: EventsService) {
    this.eventService.getAllEvents().subscribe((response) => {
      if (response.success && response.data) {
        this.events = response.data;
      }
    });
  }
}
