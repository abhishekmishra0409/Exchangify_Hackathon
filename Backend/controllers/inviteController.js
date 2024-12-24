const Invite = require("../models/inivitationModel");
const Team = require("../models/teamModel");
const Request = require("../models/requestModel");

// Send Invite (Request)
exports.sendInvite = async (req, res) => {
    const { receiverId, teamId, collabId, message } = req.body;

    try {
        const existingInvite = await Invite.findOne({
            sender: req.user._id,
            receiver: receiverId,
            team: teamId,
            collab: collabId,
            status: "pending",
        });

        if (existingInvite) {
            return res.status(400).json({ message: "Invite already sent." });
        }

        const invite = await Invite.create({
            sender: req.user._id,
            receiver: receiverId,
            team: teamId,
            collab: collabId,
            message,
        });

        // Create a request for the invite
        const request = await Request.create({
            userId: receiverId,
            invitationId: invite._id,
        });

        res.status(201).json({
            message: "Invite and request sent successfully.",
            invite,
            request,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while sending the invite." });
    }
};


// View requests (pending invites for the logged-in user)
exports.viewRequests = async (req, res) => {
    try {
        const requests = await Request.find({ userId: req.user._id })
            .populate({
                path: "invitationId",
                populate: { path: "sender team collab", select: "name email" },
            });

        res.status(200).json({ requests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching requests." });
    }
};

// Respond to a request
exports.respondToRequest = async (req, res) => {
    const { requestId, status } = req.body;

    try {
        if (!["accepted", "declined"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const request = await Request.findById(requestId).populate("invitationId");
        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        // Check if the logged-in user is the receiver
        if (request.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to respond to this request." });
        }

        // Update request status
        request.status = status;
        await request.save();

        // Update invite status
        const invite = await Invite.findById(request.invitationId);
        invite.status = status;
        await invite.save();

        if (status === "accepted") {
            // Add user to the team
            const team = await Team.findById(invite.team);
            if (!team.members.includes(req.user._id)) {
                team.members.push(req.user._id);
                await team.save();
            }
        }

        res.status(200).json({ message: `Request ${status} successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while responding to the request." });
    }
};


// Fetch invites by team ID and count users who received invites
exports.getInvitesByTeamId = async (req, res) => {
    const { teamId } = req.params;

    try {
        // Verify the team exists
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found." });
        }

        // Fetch all invites for the given team ID
        const invites = await Invite.find({ team: teamId })
            .populate("sender", "name email") // Populate sender details
            .populate("receiver", "name email"); // Populate receiver details

        // Count unique receivers
        const uniqueReceivers = new Set(invites.map((invite) => invite.receiver._id.toString()));
        const userCount = uniqueReceivers.size;

        res.status(200).json({
            message: `Found ${userCount} users who received invites.`,
            userCount,
            invites,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching invites." });
    }
};
