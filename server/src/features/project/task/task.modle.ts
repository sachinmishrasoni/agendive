import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
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
    type: {
        type: String,
        enum: ["task", "sub-task"],
        default: "task"
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
    },
    dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
