import { Document } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePasswords(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}