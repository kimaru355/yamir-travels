import { Favorite } from './favorite';

export interface FavoriteServices {
  createFavorite(favorite: Favorite): any;
  getFavorites(userId: string): any;
  deleteFavorite(id: string): any;
}
