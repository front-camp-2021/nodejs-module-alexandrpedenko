import { Request } from 'express';

let request: Request;
let requestQuery = request.query;
export type QueryType = typeof requestQuery;
