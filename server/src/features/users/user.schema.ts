import { z } from "zod";

// User Registration Schema
export const registerUserSchema = z.object({
    body: z.object({
        userId: z.string()
            .regex(/^[A-Za-z0-9]+$/, "Username can only contain alphanumeric characters")
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .trim(),
        email: z.string().email("Invalid email format"),
        password: z.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at most 20 characters"),
    }),
});

// User Complete Profile Schema
export const completeProfileSchema = z.object({
    params: z.object({
        userId: z.string(),

    }),
    body: z.object({
        firstName: z.string()
            .min(3, "First name must be at least 3 characters")
            .max(20, "First name must be at most 20 characters"),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters")
            .max(20, "Last name must be at most 20 characters"),
        avatar: z.string().optional(),
    }),
});

// User Login Schema
export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }),
});