import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from '../interfaces/auth_service';
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from '../interfaces/auth';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServices {
  private apiUrl: string = 'http://localhost:3000/auth';
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  register(user_register: UserRegister) {
    return this.http.post<
      Res<{ role: 'user' | 'admin'; token: string } | null>
    >(`${this.apiUrl}/register`, user_register);
  }

  login(user_login: UserLogin) {
    return this.http.post<
      Res<{ role: 'user' | 'admin'; token: string } | null>
    >(`${this.apiUrl}/login`, user_login);
  }

  updateDetails(user_details: UserDetails) {
    return this.http.put<Res<null>>(
      `${this.apiUrl}/update_details`,
      user_details,
      {
        headers: this.headers,
      }
    );
  }

  updatePassword(user_passwords: UserPasswords) {
    return this.http.put<Res<null>>(
      `${this.apiUrl}/update_password`,
      user_passwords,
      {
        headers: this.headers,
      }
    );
  }
}
