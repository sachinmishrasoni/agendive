import { NextFunction, Request, Response, RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next(); // If validation succeeds, pass control to the next middleware
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors, // Zod-specific validation error details
                });
                return; // Ensure the middleware stops executing after sending a response
            }
            next(error); // Pass other errors to the error-handling middleware
        }
    };
};