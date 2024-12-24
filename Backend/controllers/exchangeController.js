const Exchange = require("../models/exchangeModel");
const User = require("../models/userModel");
const { sendMail } = require("../configs/nodemailer");

exports.createExchange = async (req, res) => {
    try {
        const {  skillsOffered, skillsRequested, proposal } = req.body;
    
    const exchange = await Exchange.create({
        senderId: req.user.id,
        skillsOffered: skillsOffered,
        skillsRequested: skillsRequested,
        proposal: proposal
    });
    

    res.status(201).json({ message: "Exchange created successfully", exchange });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const sendExchangeInvite = async (req, res) => {
    const { receiverId, exchangeId } = req.body;

    try {
        const exchange = await Exchange.findById({_id: exchangeId, receiverId: receiverId});
        if (!exchange) {
            return res.status(404).json({ message: "Exchange not found" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
        }   
        
    }
};
