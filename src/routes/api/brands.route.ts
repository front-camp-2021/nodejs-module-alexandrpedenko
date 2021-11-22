import { Router } from 'express';
import productsController from '../../controllers/product.controller';

export const brandsRouter: Router = Router();

brandsRouter.get('/', productsController.getAllBrands.bind(productsController));
