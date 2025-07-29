import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "@/middlewares/validate";
import { registerUserSchema } from "./auth.schema";

const authRoutes = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
authRoutes.post(
  "/register",
  validate(registerUserSchema),
  authController.registerUser
);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
authRoutes.post("/login", authController.loginUser);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout current user
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRoutes.post("/logout", authController.logoutUser);

/**
 * @openapi
 * /api/v1/auth/logout-all:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user from all sessions
 *     responses:
 *       200:
 *         description: Logout from all sessions successful
 */
authRoutes.post("/logout-all", authController.logoutAllUsers);

/**
 * @openapi
 * /api/v1/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
authRoutes.post("/refresh-token", authController.refreshAccessToken);

/**
 * @openapi
 * /api/v1/auth/forget-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send password reset link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
authRoutes.post("/forget-password", authController.forgetPassword);

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
authRoutes.post("/reset-password", authController.resetPassword);

export default authRoutes;
