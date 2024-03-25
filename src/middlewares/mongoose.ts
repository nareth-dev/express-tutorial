import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BaseCustomError } from "./BaseCustomError";

const validateMongooseId = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { movieId } = req.params;

  if (!mongoose.isValidObjectId(movieId)) {
    const customError = new BaseCustomError('id Invalide', 404);
    console.log(customError.statusCode)
    _next(customError);
  }
  _next();
};
export { validateMongooseId };
