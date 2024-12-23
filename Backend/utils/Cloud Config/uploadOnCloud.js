const cloudinary = require('./cloudConnection');
const path = require('path');

// Function to upload an image to Cloudinary
const uploadOnCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: folder,
      transformation: [
        { width: 500, height: 500, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });
    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    throw error;
  }
};


module.exports = uploadOnCloudinary;
