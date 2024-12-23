const User = require('../models/userModel');
const deleteFromCloud = require('../configs/Cloud Config/deleteFromCloud');
const uploadOnCloudinary = require('../configs/Cloud Config/uploadOnCloud');

// Get all details of a user
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

// Update user details
const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const account = await User.findById(userId);

        if (!account) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { name, email, phone, skills, bio } = req.body;

        // Handle profile image update
        if (req.files && req.files.profileImg) {
            const profileImg = req.files.profileImg;

            // Validate the image format
            const validExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExtension = require('path').extname(profileImg.name).toLowerCase();

            if (!validExtensions.includes(fileExtension)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid image format. Only JPG, JPEG, and PNG are allowed.',
                });
            }

            // Delete the existing profile image from Cloudinary
            if (account.profileImgPublicUrl) {
                const deleteRes = await deleteFromCloud(account.profileImgPublicUrl);
                if (deleteRes.result !== 'ok') {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to delete existing profile image',
                    });
                }
            }

            // Upload new image to Cloudinary
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

        // Update other fields if provided
        if (name) account.name = name.trim();
        if (email) account.email = email.trim();
        if (phone) account.phone = phone;
        if (skills) account.skills = skills;
        if (bio) account.bio = bio.trim();

        // Save updated user details
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

module.exports = {
    getAllDetails,
    updateUserDetails,
};
