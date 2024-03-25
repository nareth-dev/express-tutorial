import { NextFunction, Request, Response } from "express";

const GlobalTime = (req: Request, res: Response, next: NextFunction) => {
  const requestTime = new Date();
  console.log(
    `[${requestTime.toLocaleString()}] ${req.method} ${req.originalUrl}`
  );
  next();
};
export { GlobalTime };
