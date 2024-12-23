const Collab = require("../models/collabModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

// Controller to handle collab-related operations
const collabController = {
    // Create a new collaboration
    createCollab: async (req, res) => {
        try {
            const user = req.user.id

            const { name, description, requirements, tags } = req.body;

            // Validate required fields
            if (!name || !description || !requirements || !tags) {
                return res.status(400).json({ message: "All fields are required." });
            }

            // Create a new collab
            const newCollab = await Collab.create({
                name,
                description,
                requirements,
                tags,
                createdBy: user,
            });

            res.status(201).json({ message: "Collab created successfully.", collab: newCollab });
        } catch (error) {
            console.error("Error creating collab:", error);
            res.status(500).json({ message: "Server error." });
        }
    },

    // Create a new team under a specific collaboration
    createTeam: async (req, res) => {
        try {
            const { collabId, teamName } = req.body;

            // Validate required fields
            if (!collabId || !teamName ) {
                return res.status(400).json({ message: "All fields are required." });
            }
            // console.log(collabId)
            // Check if the collab exists
            const collab = await Collab.findById(collabId);
            if (!collab) {
                return res.status(404).json({ message: "Collab not found." });
            }

            // Ensure only the creator of the collab can create teams
            if (collab.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to create a team for this collab." });
            }

            // Create a new team
            const team = await Team.create({
                teamName: teamName,
                collabId,
                createdBy: req.user._id, // The user who creates the team
            });

            // Add the team to the collab
            collab.teams.push(team._id);
            await collab.save();

            res.status(201).json({
                message: "Team created successfully.",
                team,
            });
        } catch (error) {
            console.error("Error creating team:", error);
            res.status(500).json({ message: "Server error." });
        }
    },

    // Fetch all collabs created by the user
    getMyCollabs: async (req, res) => {
        try {
            const collabs = await Collab.find({ createdBy: req.user._id });
            res.status(200).json({ collabs });
        } catch (error) {
            console.error("Error fetching collabs:", error);
            res.status(500).json({ message: "Server error." });
        }
    },

    // Fetch teams for a specific collab
    getTeamsByCollab: async (req, res) => {
        try {
            const { collabId } = req.params;

            // Check if the collab exists
            const collab = await Collab.findById(collabId);
            if (!collab) {
                return res.status(404).json({ message: "Collab not found." });
            }

            const teams = await Team.find({ collabId });
            res.status(200).json({ teams });
        } catch (error) {
            console.error("Error fetching teams:", error);
            res.status(500).json({ message: "Server error." });
        }
    },
};

module.exports = collabController;
