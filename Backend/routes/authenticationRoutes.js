const express = require("express");
const router = express.Router();
const { signupController, loginController } = require("../controllers/auth_controllers");
const { updateUserDetails, getAllDetails } = require("../controllers/updateDetailsControllers");
const { checkUser } = require("../middlewares/checkUserMiddleware");

const upload = require("../utils/multerConfig");
router.get("/", (req,res) => {
    res.send("auth routes are working");
})

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/getUserDetails", checkUser, getAllDetails);
router.put("/update",checkUser, updateUserDetails);

module.exports = router;