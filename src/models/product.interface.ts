import { BrandType, CategoryType } from '.';

export interface ProductInterface {
  id: string;
  images: string[];
  title: string;
  rating: number;
  price: number;
  category: CategoryType;
  brand: BrandType;
}
