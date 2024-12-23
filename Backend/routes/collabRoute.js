const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collaborationController");
const { checkUser } = require("../middlewares/checkUserMiddleware");

router.post("/create-collab", checkUser, collabController.createCollab);
router.post("/create-team", checkUser, collabController.createTeam);
router.get("/my-collabs", checkUser, collabController.getMyCollabs);
router.get("/:collabId/teams", checkUser, collabController.getTeamsByCollab);

module.exports = router;
