import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../interfaces/res';
import { FavoriteServices } from '../interfaces/favorite_service';
import { Favorite } from '../interfaces/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService implements FavoriteServices {
  apiUrl: string = 'http://localhost:3000/favorites';
  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  createFavorite(favorite: Favorite) {
    return this.http.post<Res<null>>(`${this.apiUrl}/create`, favorite, {
      headers: this.headers,
    });
  }

  getFavorites() {
    return this.http.get<Res<Favorite[] | null>>(`${this.apiUrl}/all`, {
      headers: this.headers,
    });
  }

  deleteFavorite(favoriteId: string) {
    return this.http.delete<Res<null>>(`${this.apiUrl}/delete/${favoriteId}`, {
      headers: this.headers,
    });
  }
}
