import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../interfaces/res';
import { UsersServices } from '../interfaces/users_service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServices {
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  apiUrl: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Res<User[] | null>>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }

  getUser(id: string) {
    return this.http.get<Res<User | null>>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }

  isAdmin() {
    return this.http.get<Res<boolean>>(`${this.apiUrl}/isAdmin`, {
      headers: this.headers,
    });
  }
}
