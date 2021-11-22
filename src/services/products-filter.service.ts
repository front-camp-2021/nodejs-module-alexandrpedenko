import { QueryType } from '../types';
import { ProductInterface } from '../models';

interface AllFiltersInterface {
  key: string;
  filter: (product: ProductInterface, query: QueryType) => boolean;
}

export default class ProductsFilterService {
  private allFilters: AllFiltersInterface[] = [];

  constructor() {
    this.allFilters = [
      {
        key: 'brand',
        filter: this.filterByBrand,
      },
      {
        key: 'category',
        filter: this.filterByCategory,
      },
      {
        key: 'id',
        filter: this.filterByProductId,
      },
      {
        key: 'price_gte',
        filter: this.filterByPriceGte,
      },
      {
        key: 'price_lte',
        filter: this.filterByPriceLte,
      },
      {
        key: 'rating_gte',
        filter: this.filterByRatingGte,
      },
      {
        key: 'rating_lte',
        filter: this.filterByRatingLte,
      },
      {
        key: 'q',
        filter: this.filterBySearchQuery,
      },
    ];
  }

  private filterByBrand = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const brands = (query.brand as string)
      .split(',')
      .map((brand) => brand.trim().toLowerCase());

    return brands.some((brand) => brand === product.brand.toLowerCase());
  };

  private filterByCategory = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const categories = (query.category as string)
      .split(',')
      .map((category) => category.trim().toLowerCase());

    return categories.some(
      (category) => category === product.category.toLowerCase()
    );
  };

  private filterByProductId = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const idList = (query.id as string).split(',').map((id) => id.trim());
    return idList.some((id) => id === product.id);
  };

  private filterByPriceGte = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const filterPrice = parseFloat(query.price_gte as string);

    return product.price >= filterPrice;
  };

  private filterByPriceLte = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const filterPrice = parseFloat(query.price_lte as string);

    return product.price <= filterPrice;
  };

  private filterByRatingGte = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const filterRating = parseFloat(query.rating_gte as string);

    return product.rating >= filterRating;
  };

  private filterByRatingLte = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const filterRating = parseFloat(query.rating_lte as string);

    return product.rating <= filterRating;
  };

  private filterBySearchQuery = (
    product: ProductInterface,
    query: QueryType
  ): boolean => {
    const searchTokens = (query.q as string)
      .toLowerCase()
      .split(' ')
      .filter((searchQuery) => searchQuery.trim() !== '');

    const searchTermRegex = new RegExp(searchTokens.join('|'), 'gim');
    let productSearchString =
      product.brand.toString().toLowerCase().trim() +
      ' ' +
      product.category.toString().toLowerCase().trim() +
      ' ' +
      product.title.toString().toLowerCase().trim();

    const productRegexArray = productSearchString.match(searchTermRegex);

    if (productRegexArray !== null && productRegexArray.length > 0) {
      return true;
    }

    return false;
  };

  getFiltersByQuery = (query: QueryType): AllFiltersInterface[] =>
    this.allFilters.filter(({ key }) => !!query[key]);

  getProductsByQuery = (
    appliedFilters: AllFiltersInterface[],
    allProducts: ProductInterface[],
    query: QueryType
  ): ProductInterface[] => {
    return allProducts.filter((product) =>
      appliedFilters.every(({ filter }) => filter(product, query))
    );
  };
}
