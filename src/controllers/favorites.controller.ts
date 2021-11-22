import { Response, Request, NextFunction } from 'express';
import { FavoritesService } from '../services/favorites.service';

class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  async getFavoritesProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const favoritesProducts =
        await this.favoritesService.fetchAllFavoritesProducts();

      res.json(favoritesProducts);
    } catch (error) {
      next(error);
    }
  }

  async addProductToFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const favoritesProducts =
        await this.favoritesService.postFavoritesProduct(req);
      res.json(favoritesProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteFavoritesProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const favoritesProducts =
        await this.favoritesService.deleteFavoritesProductById(req);
      res.json(favoritesProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllFavoritesProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.favoritesService.deleteAllFavoritesProducts();

      res.json([]);
    } catch (error) {
      next(error);
    }
  }
}

const favoritesController = new FavoritesController(new FavoritesService());

export default favoritesController;
