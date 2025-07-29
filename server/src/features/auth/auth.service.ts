import avatarUpload from "@/shared/utils/avatarUpload";
import User from "../users/user.model";
import ApiError from "@/shared/utils/ApiError";
import { RegisterUserParams } from "./auth.schema";
import Auth from "./auth.model";

class AuthService {

    /*
    * Generate and save token
    * @param userId - user id
    */

    async generateAndSaveToken(userId: string) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        await Auth.create({ userId, refreshToken, expiresAt: expiresAt });

        return {
            accessToken,
            refreshToken,
        };

    };


    // Register a new user
    async registerUser(params: RegisterUserParams) {
        const { userName, email, password, firstName, lastName, avatar } = params;

        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            throw new ApiError(400, "User already exists.");
        }

        const user = await User.create({ userName, email, password, firstName, lastName, avatar });
        return user;
    }

    // Login user
    async loginUser(userName: string, email: string, password: string) {
        const user = await User.findOne({ $or: [{ userName }, { email }] }).select("+password");
        if (!user) {
            throw new ApiError(404, "User not found. Please register.");
        }

        const isPasswordMatch = await user.comparePasswords(password);
        if (!isPasswordMatch) {
            throw new ApiError(401, "Invalid credentials.");
        }

        const { accessToken, refreshToken } = await this.generateAndSaveToken(user.id);

        return {
            accessToken,
            refreshToken,
            userId: user.id,
            userName: user.userName,
            email: user.email
        };
    }

    // Upload an avatar
    async uploadAvatar(userId: string, filePath: string) {
        const user = await User.findOne({ userId });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const avatarUrl = await avatarUpload(filePath);
        return avatarUrl;
    }

    async refreshAccessToken(refreshToken: string) {
        const auth = await Auth.findOne({ refreshToken });
        if (!auth) {
            throw new ApiError(401, "Invalid refresh token.");
        }

        const user = await User.findOne({ _id: auth.userId });
        if (!user) {
            throw new ApiError(401, "Invalid refresh token.");
        }

        // Check if the refresh token has expired
        if (auth.expiresAt < new Date()) {
            await Auth.deleteOne({ _id: auth._id }); // Delete expired token
            throw new ApiError(403, "Refresh token expired. Please log in again.");
        }

        const { accessToken, refreshToken: newRefreshToken } = await this.generateAndSaveToken(user.id);

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }

    async logoutUser(refreshToken: string) {
        const auth = await Auth.findOneAndDelete({ refreshToken });
        if (!auth) {
            throw new ApiError(401, "Insvalid refresh token.");
        }
    }

    async logoutAllUsers(userId: string) {
        const result = await Auth.deleteMany({ userId });
        if (!result.deletedCount) {
            throw new ApiError(404, "No sessions found for the user.");
        }
    }
}

export default new AuthService();