import { Response, Request } from 'express';

const jsonErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(400).send({ msg: 'Unable to parse request' });
};

export default jsonErrorHandler;
