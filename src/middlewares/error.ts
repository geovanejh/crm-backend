import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-errors";

export const ErrorHandler = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message, statusCode: statusCode });
};
