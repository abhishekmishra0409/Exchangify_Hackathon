const cloudinary = require('../../database/cloudConnection');
const path = require('path');

// Function to upload an image to Cloudinary
const uploadOnCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    throw error;
  }
};


module.exports = uploadOnCloudinary;
