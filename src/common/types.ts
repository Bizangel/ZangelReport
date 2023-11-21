import { Response, Request } from 'express';

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
