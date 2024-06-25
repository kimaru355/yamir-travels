import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  event: Event = {
    id: '',
    destination: '',
    description: '',
    country: '',
    duration: 0,
    durationType: 'day',
    price: 0,
    tourType: '',
    images: [],
  };
  imageUrl: string = '';

  constructor(private eventService: EventsService, private router: Router) {}

  addImage() {
    if (this.imageUrl) {
      this.event.images.push(this.imageUrl);
      this.imageUrl = '';
    }
  }

  onSubmit() {
    delete this.event.id;
    this.eventService.createEvent(this.event).subscribe((response) => {
      if (response.success && response.data) {
        this.event = {
          id: '',
          destination: '',
          description: '',
          country: '',
          duration: 0,
          durationType: 'day',
          price: 0,
          tourType: '',
          images: [],
        };
        this.imageUrl = '';
      }
      alert(response.message);
      setTimeout(() => {
        this.router.navigate(['/dashboard/events']);
      }, 2000);
    });
  }
}
