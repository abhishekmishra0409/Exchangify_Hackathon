const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const checkUser = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);     

      req.user = await User.findById(decoded.id).select('-password');
      // console.log(req.user)
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed', error:error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }
};


module.exports = { checkUser };
