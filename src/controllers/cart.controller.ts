import { Response, Request, NextFunction } from 'express';
import { CartService } from '../services/cart.service';

class CartController {
  constructor(private cartService: CartService) {}

  async getCartProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const cartProducts = await this.cartService.fetchAllCartProducts();

      res.json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartProducts = await this.cartService.postCartProduct(req);
      res.json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteCartProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const cartProducts = await this.cartService.deleteCartProductById(req);
      res.json(cartProducts);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllCartProducts(req: Request, res: Response, next: NextFunction) {
    try {
      await this.cartService.deleteAllCartProducts();

      res.json([]);
    } catch (error) {
      next(error);
    }
  }
}

const cartController = new CartController(new CartService());

export default cartController;
