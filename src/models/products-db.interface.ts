import { BrandType, CategoryType, ProductInterface } from '.';

export interface ProductDBInterface {
  products: ProductInterface[];
  categories: CategoryType[];
  brands: BrandType[];
}
