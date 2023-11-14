import { Response, Request } from 'express';

// type BodiedResponse<T> = Response & { body: T };
export type APIEndpoint<T = null> = (
  request: Request,
  response: Response,
  body: T,
) => Promise<any>;

export type HTTPMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';
