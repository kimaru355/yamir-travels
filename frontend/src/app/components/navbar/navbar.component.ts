import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
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
