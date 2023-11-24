const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const userVerification = require("../models/userVerificationModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token, verified: user.verified });
  } catch (error) {
    console.log("error");
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    await sendEmail(user, res);
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      verified: user.verified,
      message: "Check your inbox to verify email",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const emailVerify = async (req, res) => {
  const { userId, uniqueString } = req.params;
  try {
    const verifiedUser = await userVerification.findOne({ userId });
    console.log(verifiedUser);
    if (!verifiedUser) {
      const message = "Account does not exist or already verified.";
      res.status(400).json({ message });
    }
    const { expiresAt } = verifiedUser;
    const hashedUniqueString = verifiedUser.uniqueString;
    console.log(hashedUniqueString);
    if (expiresAt < Date.now()) {
      await userVerification.deleteOne({ userId });
      User.deleteOne({ _id: userId });
      const message = "Link has expired, Please signup again";
      console.log(message);
      res.status(400).json({ message });
    }
    const stringEqual = bcrypt.compare(uniqueString, hashedUniqueString);
    if (stringEqual) {
      await User.updateOne({ _id: userId }, { verified: true });
      await userVerification.deleteMany({ userId });
      const user = await User.findOne({ _id: userId });
      res.status(200).json({ user, message: "Email Verified successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifiedPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verifiedEmail.html"));
};
module.exports = { loginUser, signupUser, emailVerify, verifiedPage };
