import { QueryType } from '../types';

export class PaginationService {
  paginateProducts = <Type>(
    itemsToPaginate: Type[],
    requestQuery: QueryType
  ): Type[] => {
    const limit = parseInt(requestQuery._limit as string);
    const page = parseInt(requestQuery._page as string);

    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      return itemsToPaginate.slice(startIndex, endIndex);
    }

    return itemsToPaginate.slice(0, limit);
  };
}
