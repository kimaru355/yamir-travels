import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  token: string = localStorage.getItem('token') || '';
  isLoggedIn: boolean = false;

  constructor() {
    if (this.token) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
