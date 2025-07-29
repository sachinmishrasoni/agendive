import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [3, "First name must be at least 3 characters long"],
        maxLength: [20, "First name must be at most 20 characters long"],
        trim: true,
        default: undefined,
    },
    lastName: {
        type: String,
        minLength: [3, "Last name must be at least 3 characters long"],
        maxLength: [20, "Last name must be at most 20 characters long"],
        trim: true,
        default: undefined,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minLength: [6, "Username must be at least 6 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
        maxLength: [20, "Password must be at most 20 characters long"],
        trim: true,
        select: false,
    },
    // role: {
    //     type: String,
    //     // enum: ["admin", "member"],
    //     enum: ['owner', 'admin', 'member', 'viewer'],
    //     default: "member",
    // },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    // verificationToken: {
    //     type: String,
    //     select: false,
    // },
    // verificationTokenExpiry: {
    //     type: Date,
    //     select: false,
    // },
    // passwordResetToken: {
    //     type: String,
    //     select: false,
    // },
    // passwordResetTokenExpiry: {
    //     type: Date,
    //     select: false,
    // }
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
