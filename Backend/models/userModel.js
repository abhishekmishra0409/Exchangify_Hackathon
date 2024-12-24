const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    profileImg: {
        type: String,
        default: "",
    },
    profileImgPublicUrl: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    skills: {
        type: [
            {
                type: String,
                enum: [
                    "uiux",
                    "software_developer",
                    "graphic_designer",
                    "copywriting", 
                    "web_development",
                    "application_development",
                    "data_science",
                    "machine_learning",
                    "blockchain",
                    "cloud_computing",
                    "video_editing",
                    "animation",
                    "content_writing",
                    "socialmedia_management",
                    "seo_expert",
                ],
            },
        ],
        default: [], // Users start without any skills, can add later
    },
    bio: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    linkedin: {
        type: String,
        default: "",
    },
    github: {
        type: String,
        default: "",
    }
});

// Encrypting password before saving it to the database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

// Adding default profile image before saving
UserSchema.pre("save", async function (next) {
    if (!this.profileImg) {
        try {
            this.profileImg = `https://robohash.org/${encodeURIComponent(this.name)}`;
        } catch (error) {
            console.error("Error setting profile image:", error);
            next(error);
        }
    }
    next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
