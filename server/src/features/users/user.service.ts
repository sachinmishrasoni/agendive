import ApiError from "@/shared/utils/ApiError";
import User from "./user.model";

class UserService {
    // Get all users
    async getAllUsers() {
        return await User.find();
    }

    // Get user by ID
    async getUserById(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }

    // Update user (can be extended further)
    async updateUser(userId: string, updates: any) {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }

    // Delete user
    async deleteUser(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    }
}

export default new UserService();