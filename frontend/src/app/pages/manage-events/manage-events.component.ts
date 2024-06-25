import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.css',
})
export class ManageEventsComponent {
  events: Event[] = [];
  constructor(private eventService: EventsService) {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe((reponse) => {
      if (reponse.success && reponse.data) {
        this.events = reponse.data;
      }
    });
  }

  updateEvent(event: Event) {
    this.eventService.updateEvent(event).subscribe((response) => {
      if (response.success) {
        alert('Event updated successfully');
        this.getEvents();
      }
    });
  }
  deleteEvent(event: Event) {
    if (!event.id) {
      return;
    }
    this.eventService.deleteEvent(event.id).subscribe((response) => {
      if (response.success) {
        alert('Event deleted successfully');
        this.getEvents();
      }
    });
  }
}
