
import asyncHandler from "@/shared/utils/asyncHandler";
import ApiError from "@/shared/utils/ApiError";
import ApiSuccess from "@/shared/utils/ApiSuccess";
import { Request, Response } from "express";
import AuthServics from "./auth.service";
import { RegisterUserParams } from "./auth.schema";
// import environment from "@/shared/config/environment";
import { COOKIE_OPTIONS } from "@/shared/config/cookieOptions";

class AuthController {

    registerUser = asyncHandler(async (req: Request, res: Response) => {
        const { userName, email, password, firstName, lastName, avatar }: RegisterUserParams = req.body;

        if (!userName || !email || !password) {
            throw new ApiError(400, "userName, email, and password are required.");
        }

        const user = await AuthServics.registerUser({ userName, email, password, firstName, lastName, avatar });
        res.status(201).json(new ApiSuccess(201, user, "User created successfully."));
    });

    loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { userName, email, password } = req.body;

        if ((!userName && !email) || !password) {
            throw new ApiError(400, "Either username + password or email + password are required.");
        }

        const { userId, userName: loggedInUserId, email: loggedInEmail, accessToken, refreshToken } = await AuthServics.loginUser(
            userName,
            email,
            password
        );

        res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(new ApiSuccess(
                200,
                { userId, userName: loggedInUserId, email: loggedInEmail, accessToken, refreshToken },
                "User logged in successfully."
            ));
    });

    refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const { accessToken } = await AuthServics.refreshAccessToken(refreshToken);
        res.status(200).json(new ApiSuccess(200, { accessToken }, "Access token refreshed successfully."));
    });

    logoutUser = asyncHandler(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        console.log(refreshToken, "refreshToken");

        if (!refreshToken) {
            throw new ApiError(401, "Unauthorized Request");
        }

        await AuthServics.logoutUser(refreshToken);
        res
            .status(200)
            .clearCookie("accessToken", COOKIE_OPTIONS)
            .clearCookie("refreshToken", COOKIE_OPTIONS)
            .json(new ApiSuccess(200, null, "User logged out successfully."));
    });

    logoutAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.body;
        if (!userId) {
            throw new ApiError(400, "User id is required.");
        }

        await AuthServics.logoutAllUsers(userId);
        res
            .status(200)
            .clearCookie("accessToken", COOKIE_OPTIONS)
            .clearCookie("refreshToken", COOKIE_OPTIONS)
            .json(new ApiSuccess(200, null, "All users logged out successfully."));
    });

    forgetPassword = asyncHandler(async (req: Request, res: Response) => { });

    resetPassword = asyncHandler(async (req: Request, res: Response) => { });
}

export default new AuthController();