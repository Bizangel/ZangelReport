import crypto from 'crypto';
import { Response, Request } from 'express';

const useHeaderAuthenticationMiddleware =
  (token: string) => (req: Request, res: Response, next: any) => {
    // Check if the "Authorization" header exists in the request
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      // If the header is missing or the token is incorrect, return a 401 Unauthorized response
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (
      !crypto.timingSafeEqual(
        Buffer.from(authHeader.trim()),
        Buffer.from(token),
      )
    ) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // If the token is correct, proceed to the next middleware or route
    next();
  };

export default useHeaderAuthenticationMiddleware;
