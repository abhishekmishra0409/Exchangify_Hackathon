const uploadOnCloudinary = require("../configs/Cloud Config/uploadOnCloud");
const deleteFromCloud = require('../configs/Cloud Config/deleteFromCloud');
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const signupController = async (req, res) => {
    try {
        const { name, email, phone, skills, password } = req.body;

        if (!name || !email || !password || !phone || !skills) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields correctly"
            });
        }

        // Check if the email or phone is already in use
        const userExist = await User.findOne({ email, phone });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User with this email or phone is already registered"
            });
        }

        // Create new user
        const savingUser = await User.create({
            name,
            email,
            phone,
            password,
            skills
        });

        if (!savingUser) {
            return res.status(400).json({
                success: false,
                message: "User Signup failed, try again later"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Signup successful"
        });
    } catch (error) {
        // Handling Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User with this email or phone is already registered"
            });
        }

        console.error('Error during signup:', error);
        return res.status(400).json({
            success: false,
            message: "Signup failed, try again later",
            error: error.message
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill email and password correctly"
            });
        }

        const checkDetails = await User.findOne({ email });
        if (!checkDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found. Please signup first"
            });
        }

        const checkPassword = await checkDetails.matchPassword(password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password, try again"
            });
        }

        return res.status(200).json({
            success: true,
            userDetails: {
                id: checkDetails._id,
                name: checkDetails.name,
                email: checkDetails.email,
                phone: checkDetails.phone,
                skills: checkDetails.skills,
                token: generateToken(checkDetails)
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: "Server Error while login",
            error: error.message
        });
    }
};

const getAllDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            userData: user,
        });
    } catch (error) {
        console.error('Error getting user details:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting user details',
            error: error.message,
        });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const account = await User.findById(userId);

        if (!account) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { name, email, phone, skills, bio } = req.body;

        if (req.files && req.files.profileImg) {
            const profileImg = req.files.profileImg;

            const validExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExtension = require('path').extname(profileImg.name).toLowerCase();

            if (!validExtensions.includes(fileExtension)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid image format. Only JPG, JPEG, and PNG are allowed.',
                });
            }

            if (account.profileImgPublicUrl) {
                const deleteRes = await deleteFromCloud(account.profileImgPublicUrl);
                if (deleteRes.result !== 'ok') {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to delete existing profile image',
                    });
                }
            }

            const uploadRes = await uploadOnCloudinary(profileImg, 'Profile Images');
            if (!uploadRes || !uploadRes.secure_url || !uploadRes.public_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload new profile image',
                });
            }

            account.profileImg = uploadRes.secure_url;
            account.profileImgPublicUrl = uploadRes.public_id;
        }

        if (name) account.name = name.trim();
        if (email) account.email = email.trim();
        if (phone) account.phone = phone;
        if (skills) account.skills = skills;
        if (bio) account.bio = bio.trim();

        const updatedUser = await account.save();

        res.status(200).json({
            success: true,
            message: 'User details updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user details',
            error: error.message,
        });
    }
};

const getUsersBySkills = async (req, res) => {
    try {
        const { skills } = req.query;

        if (!skills || skills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide skills to search for",
            });
        }

        const skillArray = skills.split(',').map(skill => skill.trim());

        const users = await User.find({ skills: { $in: skillArray } }).select('-password');

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found with the specified skills",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users by skills:', error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching users by skills",
            error: error.message,
        });
    }
};

module.exports = {
    signupController,
    loginController,
    getAllDetails,
    updateUserDetails,
    getUsersBySkills
};
