const express = require("express");
const router = express.Router();
const { signupController, loginController } = require("../controllers/userControllers");
const { updateUserDetails, getAllDetails } = require("../controllers/userControllers");
const { checkUser } = require("../middlewares/authMiddleware");


router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/getUserDetails", checkUser, getAllDetails);
router.put("/update",checkUser, updateUserDetails);

module.exports = router;