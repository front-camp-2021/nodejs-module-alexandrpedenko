import { Response, Request, NextFunction } from 'express';
import { FavoritesService } from '../services/favorites.service';

class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  async getCartProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const favoritesProducts =
        await this.favoritesService.fetchAllFavoritesProducts();

      res.json(favoritesProducts);
    } catch (error) {
      next(error);
    }
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartProducts = await this.favoritesService.postFavoritesProduct(
        req
      );
      res.json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteCartProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const cartProducts =
        await this.favoritesService.deleteFavoritesProductById(req);
      res.json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllCartProducts(req: Request, res: Response, next: NextFunction) {
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
