// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         console.log('Received file:', file);
//         cb(null, true);
//     }
// });

// module.exports = upload;