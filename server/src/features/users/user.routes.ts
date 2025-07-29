
import { Router } from "express";
import userController from "./user.controller";
// import { completeProfileSchema, registerUserSchema } from "@/schemas/user.schema";
// import { validate } from "@/middlewares/validate";
// import multer from "@/middlewares/multer";

const userRoutes = Router();

// Register User and Complete Profile
// userRoutes.post(
//     "/register",
//     validate(registerUserSchema),
//     userController.registerUser
// );

// userRoutes.post(
//     "/upload-avatar/:userId",
//     multer.single("avatar"),
//     userController.uploadAvatar
// )

// userRoutes.put(
//     "/complete-profile/:userId",
//     validate(completeProfileSchema),
//     userController.completeProfile
// );

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
userRoutes.get("/:id", userController.getUserById);

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
userRoutes.get("/", userController.getAllUsers);

/**
 * @openapi
 * /api/v1/users:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
userRoutes.put("/", userController.updateUser);

/**
 * @openapi
 * /api/v1/users:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: User deleted
 */
userRoutes.delete("/", userController.deleteUser);

export default userRoutes;