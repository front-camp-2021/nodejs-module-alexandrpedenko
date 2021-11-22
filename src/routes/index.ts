import { Application } from 'express';

import { cartRouter } from './api/cart.route';
import { brandsRouter } from './api/brands.route';
import { productsRouter } from './api/products.route';
import { favoritesRouter } from './api/favorites.route';
import { categoriesRouter } from './api/categories.route';

class AppRouter {
  constructor(private app: Application) {}
  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });

    this.app.use('/categories', categoriesRouter);
    this.app.use('/favorites', favoritesRouter);
    this.app.use('/products', productsRouter);
    this.app.use('/brands', brandsRouter);
    this.app.use('/cart', cartRouter);
  }
}

export default AppRouter;
