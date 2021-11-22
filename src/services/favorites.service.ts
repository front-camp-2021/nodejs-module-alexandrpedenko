import { Request } from 'express';
import { promises as fs } from 'fs';

import { FavoritesDBType, ProductInterface } from '../models';
import { FAVORITES_DATA_FILE } from '../db';

export class FavoritesService {
  async fetchAllFavoritesProducts() {
    try {
      const productsReadDB = await fs.readFile(FAVORITES_DATA_FILE, {
        encoding: 'utf8',
      });
      let favoritesDB: FavoritesDBType = JSON.parse(productsReadDB);

      return favoritesDB;
    } catch (error) {
      console.error(error);
    }
  }

  async postFavoritesProduct(req: Request) {
    try {
      if (!req.body.id) {
        return { message: 'Product not found' };
      }

      let productsReadDB = await fs.readFile(FAVORITES_DATA_FILE, {
        encoding: 'utf8',
      });
      let favoritesDB: FavoritesDBType = JSON.parse(productsReadDB);
      let favoritesProductExists = false;

      const newFavoritesProduct = {
        id: req.body.id,
        images: req.body.images,
        title: req.body.title,
        rating: req.body.rating,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
      };

      favoritesDB = favoritesDB.map((favoritesProduct) => {
        if (favoritesProduct.id === req.body.id) {
          favoritesProductExists = true;
        }

        return favoritesProduct;
      });

      if (!favoritesProductExists) favoritesDB.push(newFavoritesProduct);

      await fs.writeFile(FAVORITES_DATA_FILE, JSON.stringify(favoritesDB));

      return favoritesDB;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFavoritesProductById(req: Request) {
    try {
      if (!req.params.id) {
        return { message: 'Product not found' };
      }

      let productsReadDB = await fs.readFile(FAVORITES_DATA_FILE, {
        encoding: 'utf8',
      });
      let favoritesDB: FavoritesDBType = JSON.parse(productsReadDB);

      favoritesDB = favoritesDB.filter(
        (favoritesProduct) => favoritesProduct.id !== req.params.id
      );

      await fs.writeFile(
        FAVORITES_DATA_FILE,
        JSON.stringify(favoritesDB, null, 4)
      );

      return favoritesDB;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAllFavoritesProducts() {
    try {
      const emptyCart: ProductInterface[] = [];
      await fs.writeFile(
        FAVORITES_DATA_FILE,
        JSON.stringify(emptyCart, null, 4)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
