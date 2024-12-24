const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    collab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collab",
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
    message: {
        type: String,
        trim: true,
        default: "",
    },
}, { timestamps: true });

module.exports = mongoose.model("Invite", InviteSchema);
