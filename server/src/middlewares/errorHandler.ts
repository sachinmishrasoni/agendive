import ApiError from "@/shared/utils/ApiError";
import { NextFunction, Request, Response } from "express";

// const errorHandler = (
//   err: ApiError | Error, // Support both ApiError and generic Error
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   const isProduction = process.env.NODE_ENV === 'production';

//   // If the error is not an instance of ApiError, treat it as an internal error.
//   const statusCode = err instanceof ApiError ? err.statusCode : 500;
//   const isOperational = err instanceof ApiError ? err.isOperational : false;
//   const message = isOperational ? err.message : 'Something went wrong';
//   const details = isOperational && err instanceof ApiError ? err.details : null;

//   // Log internal (non-operational) errors in production
//   if (!isOperational) {
//     console.error(`[INTERNAL ERROR]: ${err.stack || err.message}`);
//   }

//   // Response structure
//   res.status(statusCode).json({
//     success: false,
//     error: {
//       code: isOperational ? 'Operational Error' : 'Internal Server Error',
//       message: message,
//       details: details,
//       ...(isProduction ? {} : { stack: err.stack }), // Hide stack in production
//     },
//   });
// };

const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === "production";

  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? (err.statusCode || 500) : 500;
  const message = isApiError ? (err.message || "Something went wrong.") : "Internal Server Error";
  const details = isApiError ? err.details : null;
  const isOperational = isApiError ? err.isOperational : false;
  const errorCode = isApiError ? err.errorCode : null;

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      code: isOperational ? "Operational Error" : "Internal Server Error",
      message,
      ...(details ? { details } : {}),
      ...(errorCode ? { errorCode } : {}),
      ...(isProduction ? null : { stack: err.stack }),
    },
  });
};

export default errorHandler;