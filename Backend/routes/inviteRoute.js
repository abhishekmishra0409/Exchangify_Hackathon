const express = require("express");
const router = express.Router();
const {
    sendInvite,
    viewRequests,
    respondToRequest, getInvitesByTeamId,
} = require("../controllers/inviteController");
const { checkUser } = require("../middlewares/authMiddleware");

// Send a request (invite)
router.post("/send-request", checkUser, sendInvite);

// View requests
router.get("/view-requests", checkUser, viewRequests);

// Respond to a request
router.post("/respond-request", checkUser, respondToRequest);
// Route to get invites by team ID
router.get("/team/:teamId/invites", checkUser, getInvitesByTeamId);



module.exports = router;
