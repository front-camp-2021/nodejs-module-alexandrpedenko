import { ProductInterface } from './product.interface';

export interface CartProductInterface extends ProductInterface {
  quantity: number;
}
