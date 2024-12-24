const mongoose = require("mongoose");


const exchangeSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillsOffered: [{
        type: String,
        required: true
    }],
    skillsRequested: [{
        type: String,
        required: true
    }],
    proposal: {
        type: String,
        required: true
    },
    sentInvites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    receiverId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    
});

module.exports = mongoose.model("Exchange", exchangeSchema);
