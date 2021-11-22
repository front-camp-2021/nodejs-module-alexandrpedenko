import { Router } from 'express';
import favoritesController from '../../controllers/favorites.controller';

export const favoritesRouter: Router = Router();

favoritesRouter.get(
  '/',
  favoritesController.getCartProducts.bind(favoritesController)
);

favoritesRouter.post(
  '/',
  favoritesController.addProductToCart.bind(favoritesController)
);

favoritesRouter.delete(
  '/',
  favoritesController.deleteAllCartProducts.bind(favoritesController)
);

favoritesRouter.delete(
  '/:id',
  favoritesController.deleteCartProductById.bind(favoritesController)
);
