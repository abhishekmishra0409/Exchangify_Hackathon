const mongoose = require("mongoose");

const CollabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String], // Array of required skills
    },
    tags: {
        type: [String], // Tags for filtering
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team", // Reference to the Team model
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Collab", CollabSchema);
