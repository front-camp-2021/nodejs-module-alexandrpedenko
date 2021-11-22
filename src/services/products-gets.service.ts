import { Request } from 'express';
import { promises as fs } from 'fs';

import { ProductDBInterface, ProductInterface } from '../models';
import ProductsFilterService from './products-filter.service';
import { checkEmptyObject } from '../utils';
import { PRODUCT_DATA_FILE } from '../db';

export class ProductsGetsService {
  private productsFilterService: ProductsFilterService;

  constructor() {
    this.productsFilterService = new ProductsFilterService();
  }

  async fetchAllBrands() {
    try {
      const productsReadDB = await fs.readFile(PRODUCT_DATA_FILE, {
        encoding: 'utf8',
      });
      let productsDB: ProductDBInterface = JSON.parse(productsReadDB);

      return productsDB.brands;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAllCategories() {
    try {
      const productsReadDB = await fs.readFile(PRODUCT_DATA_FILE, {
        encoding: 'utf8',
      });
      let productsDB: ProductDBInterface = JSON.parse(productsReadDB);

      return productsDB.categories;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAllProducts(req: Request) {
    try {
      const productsReadDB = await fs.readFile(PRODUCT_DATA_FILE, {
        encoding: 'utf8',
      });
      let productsDB: ProductDBInterface = JSON.parse(productsReadDB);

      if (checkEmptyObject(req.query)) {
        return productsDB.products;
      }

      const appliedFilters = this.productsFilterService.getFiltersByQuery(
        req.query
      );

      const foundProducts: ProductInterface[] =
        this.productsFilterService.getProductsByQuery(
          appliedFilters,
          productsDB.products,
          req.query
        );

      return foundProducts;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProductById(req: Request) {
    try {
      if (req.params.id) {
        const productsReadDB = await fs.readFile(PRODUCT_DATA_FILE, {
          encoding: 'utf8',
        });

        let productsDB: ProductDBInterface = JSON.parse(productsReadDB);

        const product = productsDB.products.find(
          (product) => product.id === req.params.id
        );

        return product;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
