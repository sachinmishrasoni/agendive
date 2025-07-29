import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
    title: String,
    description: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprint",
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["open", "in-progress", "resolved", "closed"],
        default: "open",
    },
    severity: {
        type: String,
        enum: ["minor", "major", "critical"],
        default: "major",
    },
    reproductionSteps: String
}, { timestamps: true });

export default mongoose.model("Bug", bugSchema);
