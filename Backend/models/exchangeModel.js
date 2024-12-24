const mongoose = require('mongoose');

const serviceExchangeSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    responder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exchangeType: {
        type: String,
        enum: ['skill', 'money', 'project'],
        required: true,
    },
    requesterSkills: {
        type: [String],
        default: [],
    },
    responderSkills: {
        type: [String],
        default: [],
    },
    monetaryExchange: {
        amount: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: 'USD',
        },
    },
    projectExchange: {
        description: {
            type: String,
        },
        deliverables: {
            type: [String],
            default: [],
        },
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ServiceExchange', serviceExchangeSchema);
