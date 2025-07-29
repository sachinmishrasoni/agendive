import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    banner: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        trim: true,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    progress: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ["draft", "pending", "in-progress", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date,
        required: true,
        trim: true,
    },
    techStack: {
        type: [String],
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
    },
    visibility: {
        type: String,
        enum: ["private", "public", "restricted"],
        default: "private"
    },
    label: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            color: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: String,
                required: true,
                trim: true,
                enum: ["owner", "admin", "member", "viewer"],
                default: "member"
            },
            joinedAt: {
                type: Date,
                required: true,
                default: Date.now(),
                trim: true,
            }
        },
    ],
    isArchive: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
