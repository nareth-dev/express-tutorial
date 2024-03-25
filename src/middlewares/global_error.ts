import { NextFunction ,Request, Response} from "express";
import { BaseCustomError } from "./BaseCustomError";

function globalError(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Default to globalError500 if no status code is set
  if (err instanceof BaseCustomError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  _next();
}

export { globalError };
