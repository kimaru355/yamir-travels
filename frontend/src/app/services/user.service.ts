import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interfaces/auth';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  apiUrl: string = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get<Res<UserDetails | null>>(`${this.apiUrl}/details`, {
      headers: this.headers,
    });
  }
}
