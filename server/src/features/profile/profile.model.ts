import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    banner: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
        maxLength: [300, "About must be at most 300 characters long"],
    },
    mobile: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [300, "Bio must be at most 300 characters long"],
    },
    designation: {
        type: String,
        trim: true,
    },  
    skills: [{
        type: String,
        trim: true,
    }],
    location: {
        type: String,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    joiningDate: {
        type: String,
        trim: true,
    },
    portfolio: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    github: {
        type: String,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;