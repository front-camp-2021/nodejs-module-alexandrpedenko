import { Router } from 'express';
import productsController from '../../controllers/product.controller';

export const categoriesRouter: Router = Router();

categoriesRouter.get(
  '/',
  productsController.getAllCategories.bind(productsController)
);
