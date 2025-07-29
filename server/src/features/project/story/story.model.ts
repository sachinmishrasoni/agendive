import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    epic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Epic",
    },
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprint",
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done", "blocked"],
        default: "todo",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
    },
    dueDate: Date
}, { timestamps: true });

export default mongoose.model("Story", storySchema);
