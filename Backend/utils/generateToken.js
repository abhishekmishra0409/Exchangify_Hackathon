const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            skills:user.skills
        },
        process.env.JWT_SECRET,
        {expiresIn: '7d'}   
    )
};

module.exports = generateToken;