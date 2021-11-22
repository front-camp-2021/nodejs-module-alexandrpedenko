import { Request } from 'express';
import { promises as fs } from 'fs';

import { CardDBType, CartProductInterface } from '../models';
import { CART_DATA_FILE } from '../db';

export class CartService {
  async fetchAllCartProducts() {
    try {
      const productsReadDB = await fs.readFile(CART_DATA_FILE, {
        encoding: 'utf8',
      });
      let cartDB: CardDBType = JSON.parse(productsReadDB);

      return cartDB;
    } catch (error) {
      console.error(error);
    }
  }

  async postCartProduct(req: Request) {
    try {
      if (!req.body.id) {
        return { message: 'Product not found' };
      }

      let productsReadDB = await fs.readFile(CART_DATA_FILE, {
        encoding: 'utf8',
      });
      let cartDB: CardDBType = JSON.parse(productsReadDB);
      let cartProductExists = false;

      const newCartProduct = {
        id: req.body.id,
        images: req.body.images,
        title: req.body.title,
        rating: req.body.rating,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        quantity: 1,
      };

      cartDB = cartDB.map((cartProduct) => {
        if (cartProduct.id === req.body.id) {
          cartProduct.quantity++;
          cartProductExists = true;
        }

        return cartProduct;
      });

      if (!cartProductExists) cartDB.push(newCartProduct);

      await fs.writeFile(CART_DATA_FILE, JSON.stringify(cartDB));

      return cartDB;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCartProductById(req: Request) {
    try {
      if (!req.params.id) {
        return { message: 'Product not found' };
      }

      let productsReadDB = await fs.readFile(CART_DATA_FILE, {
        encoding: 'utf8',
      });
      let cartDB: CardDBType = JSON.parse(productsReadDB);

      cartDB = cartDB.flatMap((cartProduct) => {
        if (cartProduct.id === req.params.id && cartProduct.quantity > 1) {
          return { ...cartProduct, quantity: cartProduct.quantity - 1 };
        } else if (
          cartProduct.id === req.params.id &&
          cartProduct.quantity === 1
        ) {
          return [];
        } else {
          return cartProduct;
        }
      });

      await fs.writeFile(CART_DATA_FILE, JSON.stringify(cartDB, null, 4));

      return cartDB;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAllCartProducts() {
    try {
      const emptyCart: CartProductInterface[] = [];
      await fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4));
    } catch (error) {
      console.error(error);
    }
  }
}
