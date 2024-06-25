import { Favorite } from "./favorite";
import { Res } from "./res";

export interface FavoriteServices {
  createFavorite(favorite: Favorite): Promise<Res<null>>;
  getFavorites(userId: string): Promise<Res<Favorite[] | null>>;
  deleteFavorite(id: string): Promise<Res<Favorite | null>>;
}
