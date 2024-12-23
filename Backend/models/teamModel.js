const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    collabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collaboration', required: true },
    teamName: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team', TeamSchema);
