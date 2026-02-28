import { Request, Response, NextFunction } from 'express';

export function BigLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Big Request... ${req.method} ${req.url}`);
  next();
}
