import {
  Request,
  Response,
  NextFunction,
  Router,
  RouterOptions,
} from 'express';
import { z } from 'zod';
import { APIEndpoint, HTTPMethod } from '../common/types';

// Middleware generator for input validation
const useZodValidator = (zodObject: z.AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = zodObject.safeParse(req.body);
    if (!result.success)
      return res
        .status(400)
        .json({ message: 'Malformed request body', error: result.error });
    next();
  };
};

export class ZodRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
  }

  public route<T extends null>(
    method: HTTPMethod,
    path: string,
    endpoint: APIEndpoint<T>,
  ): void;
  public route<T extends z.AnyZodObject>(
    method: HTTPMethod,
    path: string,
    endpoint: APIEndpoint<z.infer<T>>,
    zodObject: T,
  ): void;
  public route<T extends z.AnyZodObject>(
    method: HTTPMethod,
    path: string,
    endpoint: APIEndpoint<z.infer<T>>,
    zodValidationObject?: T,
  ) {
    const handler = (req: Request, res: Response) => {
      if (req.body && Object.keys(req.body).length > 0) {
        return endpoint(req, res, req.body);
      }
      return endpoint(req, res, null as unknown as T);
    };

    if (!zodValidationObject) {
      return this.router[method](path, handler);
    }

    return this.router[method](
      path,
      useZodValidator(zodValidationObject),
      handler,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
export default useZodValidator;
