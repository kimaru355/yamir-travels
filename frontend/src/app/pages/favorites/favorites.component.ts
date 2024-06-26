import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../interfaces/favorite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  favorites!: Favorite[];
  constructor(private favoriteService: FavoriteService) {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteService.getFavorites().subscribe((response) => {
      if (response.success && response.data) {
        this.favorites = response.data;
      }
      console.log(this.favoriteService);
    });
  }
}
