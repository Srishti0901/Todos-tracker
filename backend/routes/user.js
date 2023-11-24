const express = require("express");
const {
  loginUser,
  signupUser,
  emailVerify,
  verifiedPage,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/verify/:userId/:uniqueString", emailVerify);

router.get("/verified", verifiedPage);

module.exports = router;
