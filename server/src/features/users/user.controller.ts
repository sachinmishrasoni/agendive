
import { Request, Response } from "express";
import UserService from "./user.service";
import asyncHandler from "@/shared/utils/asyncHandler";

interface CustomRequest extends Request {
    file?: Express.Multer.File; // Add the `file` property
}

class UserController {
    registerUser = asyncHandler(async (req: Request, res: Response) => {

    });

    completeProfile = asyncHandler(async (req: Request, res: Response) => {

    });

    uploadAvatar = asyncHandler(async (req: CustomRequest, res: Response) => {
        // const { userId } = req.params;

        // if (!req.file || !req.file.path) {
        //     throw new AppError("No avatar file uploaded", 400);
        // }

        // const avatarUrl = await UserService.uploadAvatar(userId, req.file.path);
        // res.status(200).json({
        //     success: true,
        //     avatarUrl: avatarUrl?.secure_url,
        //     message: "Avatar uploaded successfully.",
        // });
    });

    loginUser = asyncHandler(async (req: Request, res: Response) => {

    });

    getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        res.status(200).json({
            success: true,
            data: users,
            message: "Users fetched successfully.",
        });
    });

    getUserById = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;

        const user = await UserService.getUserById(userId);
        res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully.",
        });
    });

    updateUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        const updates = req.body;

        const user = await UserService.updateUser(userId, updates);
        res.status(200).json({
            success: true,
            data: user,
            message: "User updated successfully.",
        });
    });

    deleteUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;

        await UserService.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        });
    });
}

export default new UserController();