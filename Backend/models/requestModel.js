const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        invitationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invite",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
