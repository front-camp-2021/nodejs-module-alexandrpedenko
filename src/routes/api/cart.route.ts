import { Router } from 'express';
import cartController from '../../controllers/cart.controller';

export const cartRouter: Router = Router();

cartRouter.get('/', cartController.getCartProducts.bind(cartController));

cartRouter.post('/', cartController.addProductToCart.bind(cartController));

cartRouter.delete(
  '/',
  cartController.deleteAllCartProducts.bind(cartController)
);

cartRouter.delete(
  '/:id',
  cartController.deleteCartProductById.bind(cartController)
);
