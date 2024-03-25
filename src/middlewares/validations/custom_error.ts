

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCode } from '../responeCode/status_code';
//code defines a middleware function for validating request body data using Zod schemas in an Express.js application

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function customError(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(StatusCode.UnprocessableEntity).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCode.InternalServerError).json({ error: 'Internal Server Error' });
      }
    }
  };
}