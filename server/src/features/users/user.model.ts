import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@/shared/types/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import environment from "@/shared/config/environment";

const userSchema: Schema<IUser> = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        maxLength: [20, "Password must be at most 20 characters long"],
        trim: true,
        select: false,
    },
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
    avatar: {
        type: String,
        trim: true,
        default: null,
    },
},
    { timestamps: true }
);

// For getting full name
userSchema.virtual("fullName").get(function () {
    if (!this.firstName || !this.lastName) return this.userName;

    return `${this.firstName} ${this.lastName}`;
});

// For removing password from response
userSchema.set("toJSON", {
    transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
    },
    virtuals: true
});

// For removing password from response
userSchema.set("toObject", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
    },
    virtuals: true
});

// For hashing password before saving and updating
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// For comparing password
userSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error: any) {
        console.error(`[ERROR] ${error.message}`);
        return false;
    }
};

// For generating jwt token
// userSchema.methods.generateAccessToken = function () {
//     try {
//         const token = jwt.sign(
//             { id: this._id, email: this.email, userName: this.userName },
//             environment.ACCESS_TOKEN_SECRET_KEY as string,
//             {
//                 expiresIn: environment.ACCESS_TOKEN_EXPIRES_IN,
//             }
//         );
//         return token;
//     } catch (error: any) {
//         console.error(`[ERROR] ${error.message}`);
//     }
// };

// userSchema.methods.generateRefreshToken = function () {
//     try {
//         const token = jwt.sign(
//             { id: this._id },
//             environment.REFRESH_TOKEN_SECRET_KEY as string,
//             {
//                 expiresIn: environment.REFRESH_TOKEN_EXPIRES_IN,
//             }
//         );
//         return token;
//     } catch (error: any) {
//         console.error(`[ERROR] ${error.message}`);
//     }
// };

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;