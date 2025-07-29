import mongoose from "mongoose";

const epicSchema = new mongoose.Schema({
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("Epic", epicSchema);
