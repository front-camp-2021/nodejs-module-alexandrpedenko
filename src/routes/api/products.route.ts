import { Router } from 'express';
import productsController from '../../controllers/product.controller';

export const productsRouter: Router = Router();

productsRouter.get(
  '/',
  productsController.getAllProducts.bind(productsController)
);

productsRouter.get(
  '/:id',
  productsController.getProductById.bind(productsController)
);
