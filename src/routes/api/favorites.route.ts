import { Router } from 'express';
import favoritesController from '../../controllers/favorites.controller';

export const favoritesRouter: Router = Router();

favoritesRouter.get(
  '/',
  favoritesController.getFavoritesProducts.bind(favoritesController)
);

favoritesRouter.post(
  '/',
  favoritesController.addProductToFavorites.bind(favoritesController)
);

favoritesRouter.delete(
  '/',
  favoritesController.deleteAllFavoritesProducts.bind(favoritesController)
);

favoritesRouter.delete(
  '/:id',
  favoritesController.deleteFavoritesProductById.bind(favoritesController)
);
