import { Response, Request, NextFunction } from 'express';

import { ProductsGetsService } from '../services/products-gets.service';
import { PaginationService } from '../services/pagination.service';
import { ApiError } from '../exceptions/api-error.exception';
import { ProductInterface } from '../models';

class ProductsController {
  constructor(
    private productGetsService: ProductsGetsService,
    private paginationService: PaginationService
  ) {}

  async getAllBrands(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await this.productGetsService.fetchAllBrands();

      res.json(brands);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.productGetsService.fetchAllCategories();

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productGetsService.fetchAllProducts(req);
      let paginatedProducts: ProductInterface[] = [];
      let result: ProductInterface[];

      if (req.query._limit && products.length > 0) {
        paginatedProducts = this.paginationService.paginateProducts(
          products,
          req.query
        );

        result = paginatedProducts;
      } else {
        result = products;
      }

      res.set({
        'Content-Type': 'application/json',
        'X-Total-Count': products.length,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productGetsService.fetchProductById(req);

      if (!product) {
        return next(ApiError.NotFound('Product not found'));
      }

      res.set({
        'Content-Type': 'application/json',
      });
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

const productsController = new ProductsController(
  new ProductsGetsService(),
  new PaginationService()
);

export default productsController;
