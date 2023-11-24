const mongoose = require("mongoose");

const userVerifySchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

module.exports = mongoose.model("userVerification", userVerifySchema);
