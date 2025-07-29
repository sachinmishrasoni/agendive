import { z } from "zod";

export const registerUserSchema = z.object({
    body: z.object({
        userName: z.string()
            .regex(/^[A-Za-z0-9]+$/, "Username can only contain alphanumeric characters")
            .min(6, "Username must be at least 6 characters")
            .max(20, "Username must be at most 20 characters")
            .trim(),
        email: z.string().email("Invalid email format").trim().toLowerCase(),
        password: z.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at most 20 characters"),
        firstName: z.string()
            .min(3, "First name must be at least 3 characters")
            .max(20, "First name must be at most 20 characters")
            .trim()
            .optional(),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters")
            .max(20, "Last name must be at most 20 characters")
            .trim()
            .optional(),
        avatar: z.string().trim().optional(),
    })
});

export type RegisterUserParams = z.infer<typeof registerUserSchema>["body"];

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format").trim().toLowerCase(),
        password: z.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at most 20 characters")
            .trim(),
    })
});

export type LoginUserParams = z.infer<typeof loginUserSchema>["body"];