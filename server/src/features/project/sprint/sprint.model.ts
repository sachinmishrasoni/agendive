import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    goal: {
        type: String,
        trim: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("Sprint", sprintSchema);
