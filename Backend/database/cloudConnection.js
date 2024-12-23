const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Check if environment variables are available
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Missing Cloudinary credentials in .env file');
}

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dcfend16u',
    api_key: '634834656848171',
    api_secret: 'MmzDN91RO2C6BxlvTVQrQaoffh0'
});

console.log('Cloudinary connected successfully');

module.exports = cloudinary;
