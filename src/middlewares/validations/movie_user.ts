
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCode } from '../responeCode/status_code';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MovieUser(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCode.UnprocessableEntity).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCode.InternalServerError).json({ error: 'Internal Server Error' });
      }
    }
  };
}
