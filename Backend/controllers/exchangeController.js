const ServiceExchange = require('../models/exchangeModel');

// Create a new service exchange
exports.createExchange = async (req, res) => {
    try {
        const {  responder, exchangeType, requesterSkills, responderSkills, monetaryExchange, projectExchange } = req.body;
        const user = req.user._id

        const newExchange = new ServiceExchange({
            requester:user,
            responder,
            exchangeType,
            requesterSkills,
            responderSkills,
            monetaryExchange,
            projectExchange,
        });

        const savedExchange = await newExchange.save();
        res.status(201).json({ success: true, data: savedExchange });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all service exchanges
exports.getAllExchanges = async (req, res) => {
    try {
        const exchanges = await ServiceExchange.find().populate('requester responder');
        res.status(200).json({ success: true, data: exchanges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific service exchange by ID
exports.getExchangeById = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await ServiceExchange.findById(id).populate('requester responder');

        if (!exchange) {
            return res.status(404).json({ success: false, message: 'Exchange not found' });
        }

        res.status(200).json({ success: true, data: exchange });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a service exchange
exports.updateExchange = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body;

        if (!["accept", "decline"].includes(action)) {
            return res.status(400).json({ success: false, message: "Invalid action" });
        }

        const updatedExchange = await ServiceExchange.findByIdAndUpdate(
            id,
            {
                status: action === "accept" ? "accepted" : "declined",
                updatedAt: Date.now(),
            },
            { new: true, runValidators: true }
        ).populate("requester responder");

        if (!updatedExchange) {
            return res.status(404).json({ success: false, message: "Exchange not found" });
        }

        res.status(200).json({ success: true, data: updatedExchange });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete a service exchange
exports.deleteExchange = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExchange = await ServiceExchange.findByIdAndDelete(id);

        if (!deletedExchange) {
            return res.status(404).json({ success: false, message: 'Exchange not found' });
        }

        res.status(200).json({ success: true, message: 'Exchange deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all exchanges for a specific user
exports.getExchangesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const exchanges = await ServiceExchange.find({
            $or: [{ requester: userId }, { responder: userId }],
        }).populate('requester responder');

        res.status(200).json({ success: true, data: exchanges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get exchange requests for the logged-in user
exports.getUserRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all exchange requests where the logged-in user is the responder
        const requests = await ServiceExchange.find({ responder: userId, status: 'pending' })
            .populate('requester', 'name email') // Populate requester details
            .exec();

        // Return a custom message with empty array if no requests are found
        if (!requests.length) {
            return res.status(200).json({ message: 'No pending requests found.', requests: [] });
        }

        res.status(200).json({ requests });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching requests.' });
    }
};


// Accept or decline an exchange request
exports.handleExchangeRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { action } = req.body; // 'accept' or 'decline'

        if (!['accept', 'decline'].includes(action)) {
            return res.status(400).json({ message: 'Invalid action. Use \"accept\" or \"decline\".' });
        }

        const exchange = await ServiceExchange.findById(requestId);

        if (!exchange) {
            return res.status(404).json({ message: 'Exchange request not found.' });
        }

        if (String(exchange.responder) !== String(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized action on this request.' });
        }

        exchange.status = action === 'accept' ? 'accepted' : 'declined';
        await exchange.save();

        res.status(200).json({ message: `Request has been ${action}ed successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while handling the request.' });
    }
};